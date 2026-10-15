import { Router, type RequestHandler } from "express";
import { randomUUID } from "node:crypto";
import { requireStaff } from "../middlewares/requireStaff.js";
import type { LedgerRow } from "../lib/archive.js";

export type Note = {
  id: string;
  playerId: string;
  opponentId: string | null;
  opponentName: string;
  matchKey: string | null;
  body: string;
  createdAt: string;
  updatedAt: string;
};

type NewNote = Pick<Note, "playerId" | "opponentId" | "opponentName" | "matchKey" | "body">;

export type ArchiveStore = {
  listLedger: () => Promise<LedgerRow[]>;
  listNotes: (playerId: string) => Promise<Note[]>;
  createNote: (note: NewNote) => Promise<Note>;
  updateNote: (playerId: string, id: string, body: string) => Promise<Note | null>;
  deleteNote: (playerId: string, id: string) => Promise<boolean>;
  countNotes: (playerId: string) => Promise<number>;
  findPlayerByToken: (token: string) => Promise<{ id: string; name: string } | null>;
};

export const MAX_NOTE_LENGTH = 5000;
export const MAX_NOTES_PER_PLAYER = 2000;

const iso = (value: Date | string) => new Date(value).toISOString();

const databaseStore: ArchiveStore = {
  async listLedger() {
    const { db, coachingLedgerTable } = await import("@workspace/db");
    const { asc } = await import("drizzle-orm");
    const rows = await db.select().from(coachingLedgerTable).orderBy(asc(coachingLedgerTable.startsAt));
    return rows.map((row) => ({ ...row, startsAt: iso(row.startsAt) }));
  },
  async listNotes(playerId) {
    const { db, playerNotesTable } = await import("@workspace/db");
    const { desc, eq } = await import("drizzle-orm");
    const rows = await db.select().from(playerNotesTable).where(eq(playerNotesTable.playerId, playerId)).orderBy(desc(playerNotesTable.createdAt));
    return rows.map((row) => ({ ...row, createdAt: iso(row.createdAt), updatedAt: iso(row.updatedAt) }));
  },
  async createNote(note) {
    const { db, playerNotesTable } = await import("@workspace/db");
    const [row] = await db.insert(playerNotesTable).values({ id: randomUUID(), ...note }).returning();
    return { ...row, createdAt: iso(row.createdAt), updatedAt: iso(row.updatedAt) };
  },
  async updateNote(playerId, id, body) {
    const { db, playerNotesTable } = await import("@workspace/db");
    const { and, eq } = await import("drizzle-orm");
    const [row] = await db.update(playerNotesTable).set({ body, updatedAt: new Date() })
      .where(and(eq(playerNotesTable.id, id), eq(playerNotesTable.playerId, playerId))).returning();
    return row ? { ...row, createdAt: iso(row.createdAt), updatedAt: iso(row.updatedAt) } : null;
  },
  async deleteNote(playerId, id) {
    const { db, playerNotesTable } = await import("@workspace/db");
    const { and, eq } = await import("drizzle-orm");
    const rows = await db.delete(playerNotesTable).where(and(eq(playerNotesTable.id, id), eq(playerNotesTable.playerId, playerId))).returning({ id: playerNotesTable.id });
    return rows.length > 0;
  },
  async countNotes(playerId) {
    const { db, playerNotesTable } = await import("@workspace/db");
    const { eq, sql } = await import("drizzle-orm");
    const [row] = await db.select({ count: sql<number>`count(*)::int` }).from(playerNotesTable).where(eq(playerNotesTable.playerId, playerId));
    return row?.count ?? 0;
  },
  async findPlayerByToken(token) {
    const { db, trackerStateTable } = await import("@workspace/db");
    const { eq } = await import("drizzle-orm");
    const [row] = await db.select().from(trackerStateTable).where(eq(trackerStateTable.id, "main"));
    const players = (row?.data as { players?: Array<{ id?: unknown; name?: unknown; shareToken?: unknown }> } | undefined)?.players ?? [];
    const player = players.find((item) => typeof item.shareToken === "string" && item.shareToken === token);
    return player && typeof player.id === "string" ? { id: player.id, name: typeof player.name === "string" ? player.name : "" } : null;
  },
};

const text = (value: unknown, max: number): string | null =>
  typeof value === "string" && value.trim() && value.trim().length <= max ? value.trim() : null;

/**
 * The permanent coaching record (staff only) and each player's private journal (the player's own link only).
 * No staff route reads the journal: a note is visible to whoever holds that player's link and nobody else
 * in the app.
 */
export function createArchiveRouter(dependencies: { store?: ArchiveStore; authorizeStaff?: RequestHandler } = {}) {
  const router = Router();
  const store = dependencies.store ?? databaseStore;
  const staff = dependencies.authorizeStaff ?? requireStaff;

  router.get("/archive", staff, async (req, res) => {
    res.set("Cache-Control", "no-store");
    try {
      res.json({ rows: await store.listLedger() });
    } catch (error) {
      req.log?.error({ err: error }, "Could not read the permanent coaching record");
      res.status(503).json({ error: "The coaching record could not be loaded." });
    }
  });

  const withPlayer = (handler: (req: Parameters<RequestHandler>[0], res: Parameters<RequestHandler>[1], player: { id: string; name: string }) => Promise<void>): RequestHandler =>
    async (req, res) => {
      res.set("Cache-Control", "no-store");
      try {
        const token = String(req.params["shareToken"] ?? "");
        const player = token.length >= 20 && token.length <= 128 ? await store.findPlayerByToken(token) : null;
        if (!player) {
          res.status(404).json({ error: "Player link not found" });
          return;
        }
        await handler(req, res, player);
      } catch (error) {
        req.log?.error({ err: error }, "Player notes request failed");
        res.status(503).json({ error: "Your notes could not be reached. Please try again." });
      }
    };

  router.get("/players/:shareToken/notes", withPlayer(async (_req, res, player) => {
    res.json({ notes: await store.listNotes(player.id) });
  }));

  router.post("/players/:shareToken/notes", withPlayer(async (req, res, player) => {
    const body = text(req.body?.body, MAX_NOTE_LENGTH);
    const opponentName = text(req.body?.opponentName, 120);
    const opponentIdRaw = req.body?.opponentId;
    const opponentId = typeof opponentIdRaw === "string" && /^\d{1,12}$/.test(opponentIdRaw) ? opponentIdRaw : null;
    const matchKey = text(req.body?.matchKey, 120);
    if (!body) {
      res.status(400).json({ error: `Write a note of up to ${MAX_NOTE_LENGTH} characters.` });
      return;
    }
    if (!opponentName) {
      res.status(400).json({ error: "Say which opponent the note is about." });
      return;
    }
    if (await store.countNotes(player.id) >= MAX_NOTES_PER_PLAYER) {
      res.status(409).json({ error: "This journal is full." });
      return;
    }
    res.status(201).json(await store.createNote({ playerId: player.id, opponentId, opponentName, matchKey, body }));
  }));

  router.put("/players/:shareToken/notes/:id", withPlayer(async (req, res, player) => {
    const body = text(req.body?.body, MAX_NOTE_LENGTH);
    if (!body) {
      res.status(400).json({ error: `Write a note of up to ${MAX_NOTE_LENGTH} characters.` });
      return;
    }
    const note = await store.updateNote(player.id, String(req.params["id"] ?? ""), body);
    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }
    res.json(note);
  }));

  router.delete("/players/:shareToken/notes/:id", withPlayer(async (req, res, player) => {
    if (!(await store.deleteNote(player.id, String(req.params["id"] ?? "")))) {
      res.status(404).json({ error: "Note not found" });
      return;
    }
    res.sendStatus(204);
  }));

  return router;
}

export default createArchiveRouter();
