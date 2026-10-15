import assert from "node:assert/strict";
import test from "node:test";
import express, { type Express, type RequestHandler } from "express";
import { createArchiveRouter, type ArchiveStore, type Note, MAX_NOTE_LENGTH } from "./archive.js";
import { ledgerRowsFromState } from "../lib/archive.js";
import type { ReadonlyTrackerState } from "../lib/club-locker.js";

async function withServer(app: Express, run: (url: string) => Promise<void>) {
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  try { await run(`http://127.0.0.1:${address.port}`); }
  finally { await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())); }
}

const TOKEN_A = "a".repeat(43);
const TOKEN_B = "b".repeat(43);

function fixture() {
  const notes: Note[] = [];
  let next = 1;
  const store: ArchiveStore = {
    listLedger: async () => [],
    listNotes: async (playerId) => notes.filter((note) => note.playerId === playerId).reverse(),
    createNote: async (note) => {
      const created = { id: `n${next++}`, ...note, createdAt: "2026-10-17T15:00:00.000Z", updatedAt: "2026-10-17T15:00:00.000Z" };
      notes.push(created);
      return created;
    },
    updateNote: async (playerId, id, body) => {
      const note = notes.find((item) => item.id === id && item.playerId === playerId);
      if (!note) return null;
      note.body = body;
      return note;
    },
    deleteNote: async (playerId, id) => {
      const index = notes.findIndex((item) => item.id === id && item.playerId === playerId);
      if (index < 0) return false;
      notes.splice(index, 1);
      return true;
    },
    countNotes: async (playerId) => notes.filter((note) => note.playerId === playerId).length,
    findPlayerByToken: async (token) => token === TOKEN_A ? { id: "100", name: "Vikram" } : token === TOKEN_B ? { id: "200", name: "Asha" } : null,
  };
  let staffAllowed = true;
  const staff: RequestHandler = (_req, res, next) => { if (!staffAllowed) { res.status(403).json({ error: "no" }); return; } next(); };
  const app = express();
  app.use(express.json());
  app.use(createArchiveRouter({ store, authorizeStaff: staff }));
  return { app, notes, setStaff: (value: boolean) => { staffAllowed = value; } };
}

const json = (body: unknown) => ({ headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

test("a player writes, edits and deletes notes through their own link", async () => {
  const f = fixture();
  await withServer(f.app, async (url) => {
    const created = await fetch(`${url}/players/${TOKEN_A}/notes`, { method: "POST", ...json({ body: " Lefty, hits the nick on the forehand ", opponentName: "Kai Smith", opponentId: "5551", matchKey: "19284:1:100" }) });
    assert.equal(created.status, 201);
    const note = await created.json() as Note;
    assert.equal(note.body, "Lefty, hits the nick on the forehand");
    assert.equal(note.opponentId, "5551");
    const list = await (await fetch(`${url}/players/${TOKEN_A}/notes`)).json() as { notes: Note[] };
    assert.deepEqual(list.notes.map((item) => item.id), [note.id]);
    const edited = await fetch(`${url}/players/${TOKEN_A}/notes/${note.id}`, { method: "PUT", ...json({ body: "Lefty. Play to the backhand." }) });
    assert.equal((await edited.json() as Note).body, "Lefty. Play to the backhand.");
    assert.equal((await fetch(`${url}/players/${TOKEN_A}/notes/${note.id}`, { method: "DELETE" })).status, 204);
    assert.equal(f.notes.length, 0);
  });
});

test("notes are private: another player's link, a bad link and staff cannot reach them", async () => {
  const f = fixture();
  await withServer(f.app, async (url) => {
    const note = await (await fetch(`${url}/players/${TOKEN_A}/notes`, { method: "POST", ...json({ body: "secret plan", opponentName: "Kai" }) })).json() as Note;
    const other = await (await fetch(`${url}/players/${TOKEN_B}/notes`)).json() as { notes: Note[] };
    assert.deepEqual(other.notes, []);
    assert.equal((await fetch(`${url}/players/${TOKEN_B}/notes/${note.id}`, { method: "PUT", ...json({ body: "mine now" }) })).status, 404);
    assert.equal((await fetch(`${url}/players/${TOKEN_B}/notes/${note.id}`, { method: "DELETE" })).status, 404);
    assert.equal(f.notes[0].body, "secret plan");
    assert.equal((await fetch(`${url}/players/${"c".repeat(43)}/notes`)).status, 404);
    assert.equal((await fetch(`${url}/players/short/notes`)).status, 404);
    // No route gives staff, or anyone else, a way to read a player's notes by player.
    for (const path of ["/notes", "/players/100/notes", "/archive/notes"]) assert.equal((await fetch(`${url}${path}`)).status, 404);
  });
});

test("notes are checked: empty, too long, no opponent, and a full journal are refused", async () => {
  const f = fixture();
  await withServer(f.app, async (url) => {
    const post = (body: unknown) => fetch(`${url}/players/${TOKEN_A}/notes`, { method: "POST", ...json(body) });
    assert.equal((await post({ body: "   ", opponentName: "Kai" })).status, 400);
    assert.equal((await post({ body: "x".repeat(MAX_NOTE_LENGTH + 1), opponentName: "Kai" })).status, 400);
    assert.equal((await post({ body: "ok" })).status, 400);
    const stored = await (await post({ body: "ok", opponentName: "Kai", opponentId: "abc" })).json() as Note;
    assert.equal(stored.opponentId, null);
  });
});

test("only staff read the permanent coaching record", async () => {
  const f = fixture();
  await withServer(f.app, async (url) => {
    assert.equal((await fetch(`${url}/archive`)).status, 200);
    assert.equal((await fetch(`${url}/archive`)).headers.get("cache-control"), "no-store");
    f.setStaff(false);
    assert.equal((await fetch(`${url}/archive`)).status, 403);
  });
});

test("the permanent record keeps played matches with a coach, names copied in, and drops the rest", () => {
  const state = {
    players: [{ id: "100", name: "Vikram", shareToken: "x" }],
    coaches: [{ id: "c1", name: "Alex" }, { id: "unassigned", name: "Unassigned" }, { id: "not-coaching", name: "Not coaching" }],
    matches: [
      { id: "m1", externalId: "19284:9:100", playerId: "100", opponent: "Kai", opponentId: "5551", startsAt: "2026-10-17T15:40:00Z", endsAt: "2026-10-17T16:25:00Z", timeZone: "America/Chicago", venue: "Chicago", court: "4", coachId: "c1", coachMode: "virtual", status: "completed" },
      { id: "m2", externalId: "19284:10:100", playerId: "100", opponent: "Lee", startsAt: "2026-10-17T17:00:00Z", endsAt: "2026-10-17T17:45:00Z", venue: "Chicago", court: "4", coachId: "c1", status: "upcoming" },
      { id: "m3", externalId: "19284:11:100", playerId: "100", opponent: "Sam", startsAt: "2026-10-17T18:00:00Z", endsAt: "2026-10-17T18:45:00Z", venue: "Chicago", court: "4", coachId: "not-coaching", status: "completed" },
      { id: "m4", externalId: "19284:12:100", playerId: "100", opponent: "Max", startsAt: "2026-10-17T19:00:00Z", endsAt: "2026-10-17T19:45:00Z", venue: "Chicago", court: "4", coachId: "unassigned", status: "completed" },
      { id: "m5", externalId: null, playerId: "100", opponent: "Zed", startsAt: "2026-10-18T15:00:00Z", endsAt: "2026-10-18T15:45:00Z", venue: "Home", court: "1", coachId: "c1", status: "completed" },
    ],
  } as unknown as ReadonlyTrackerState;
  const rows = ledgerRowsFromState(state, new Map([["19284", { name: "University Club of Chicago Junior Gold", endsOn: "2026-10-18" }]]));
  assert.equal(rows.length, 2);
  assert.deepEqual(rows[0], {
    matchKey: "19284:9:100", tournamentId: "19284", tournamentName: "University Club of Chicago Junior Gold", tournamentEndsOn: "2026-10-18",
    venue: "Chicago", timeZone: "America/Chicago", startsAt: "2026-10-17T15:40:00.000Z", playerId: "100", playerName: "Vikram",
    opponentName: "Kai", opponentId: "5551", coachId: "c1", coachName: "Alex", coachMode: "virtual",
  });
  assert.equal(rows[1].matchKey, "local:m5");
  assert.equal(rows[1].tournamentName, "Home");
});

test("a tournament's real name and last day come from Club Locker's public record, and a failure is quiet", async () => {
  const { clubLockerTournamentLookup } = await import("../lib/archive.js");
  const original = globalThis.fetch;
  try {
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/tournaments/19445")) return Response.json({ Tournament_Name: " West Coast-JCT #2 presented by Harrow Sports ", End_Date: "2026-10-12T00:00:00" });
      return new Response("nope", { status: 404 });
    }) as typeof fetch;
    assert.deepEqual(await clubLockerTournamentLookup("19445"), { name: "West Coast-JCT #2 presented by Harrow Sports", endsOn: "2026-10-12" });
    assert.equal(await clubLockerTournamentLookup("99999"), null);
  } finally {
    globalThis.fetch = original;
  }
});
