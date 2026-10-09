import { Router, type RequestHandler } from "express";
import { clerkClient } from "@clerk/express";
import { configuredStaffIds, requireStaff, requireTrackerAccess } from "../middlewares/requireStaff.js";

type Account = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  banned: boolean;
  locked: boolean;
  publicMetadata: Record<string, unknown>;
  emailAddresses: Array<{ emailAddress: string; verification: { status: string } | null }>;
};

type AccountDirectory = {
  list: (offset: number) => Promise<{ data: Account[]; totalCount: number }>;
  findByEmail: (email: string) => Promise<Account[]>;
  get: (id: string) => Promise<Account>;
  setRole: (id: string, role: "coach" | null) => Promise<void>;
};

const directory: AccountDirectory = {
  list: (offset) => clerkClient.users.getUserList({ offset, limit: 100 }),
  findByEmail: async (email) => (await clerkClient.users.getUserList({ emailAddress: [email], limit: 10 })).data,
  get: (id) => clerkClient.users.getUser(id),
  setRole: async (id, role) => { await clerkClient.users.updateUserMetadata(id, { publicMetadata: { role } }); },
};

function coachAccount(user: Account, email?: string) {
  return {
    id: user.id,
    email: email ?? user.emailAddresses.find((item) => item.verification?.status === "verified")?.emailAddress ?? "",
    name: [user.firstName, user.lastName].filter(Boolean).join(" ") || "Coach",
  };
}

export function createCoachAccessRouter(dependencies: {
  directory?: AccountDirectory;
  authorizeStaff?: RequestHandler;
  authorizeTracker?: RequestHandler;
  isConfiguredStaff?: (id: string) => boolean;
} = {}) {
  const router = Router();
  const accounts = dependencies.directory ?? directory;
  const staff = dependencies.authorizeStaff ?? requireStaff;
  const tracker = dependencies.authorizeTracker ?? requireTrackerAccess;
  const isConfiguredStaff = dependencies.isConfiguredStaff ?? ((id) => configuredStaffIds().has(id));

  router.get("/tracker/access", tracker, (_req, res) => {
    res.set("Cache-Control", "no-store");
    res.json({ role: res.locals.trackerRole });
  });

  router.get("/coach-access", staff, async (req, res) => {
    res.set("Cache-Control", "no-store");
    try {
      const coaches: ReturnType<typeof coachAccount>[] = [];
      let offset = 0;
      while (true) {
        const page = await accounts.list(offset);
        for (const user of page.data) {
          if (user.publicMetadata.role === "coach" && !isConfiguredStaff(user.id)) coaches.push(coachAccount(user));
        }
        offset += page.data.length;
        if (offset >= page.totalCount || page.data.length === 0) break;
      }
      res.json({ coaches });
    } catch (error) {
      req.log?.error({ err: error }, "Could not list coach accounts");
      res.status(503).json({ error: "Coach accounts could not be loaded. Please try again." });
    }
  });

  router.post("/coach-access", staff, async (req, res) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      res.status(400).json({ error: "Enter the email address the coach used to sign up." });
      return;
    }
    try {
      const candidates = await accounts.findByEmail(email);
      const user = candidates.find((account) => account.emailAddresses.some(
        (address) => address.emailAddress.toLowerCase() === email && address.verification?.status === "verified",
      ));
      if (!user) {
        res.status(404).json({ error: "No verified account found. Ask the coach to sign up and verify this email in this version of the app first." });
        return;
      }
      if (user.banned || user.locked) {
        res.status(409).json({ error: "This account is blocked. Coach access cannot be approved." });
        return;
      }
      if (isConfiguredStaff(user.id) || user.publicMetadata.role === "staff") {
        res.status(409).json({ error: "This account already has full staff access. It has not been changed." });
        return;
      }
      if (user.publicMetadata.role && user.publicMetadata.role !== "coach") {
        res.status(409).json({ error: "This account has another role. It has not been changed." });
        return;
      }
      await accounts.setRole(user.id, "coach");
      res.json(coachAccount(user, email));
    } catch (error) {
      req.log?.error({ err: error }, "Could not approve coach access");
      res.status(503).json({ error: "Coach access could not be approved. Please try again." });
    }
  });

  router.delete("/coach-access/:userId", staff, async (req, res) => {
    const userId = req.params.userId;
    if (typeof userId !== "string" || !/^user_[A-Za-z0-9]+$/.test(userId)) {
      res.status(400).json({ error: "Invalid coach account." });
      return;
    }
    try {
      const user = await accounts.get(userId);
      if (isConfiguredStaff(user.id) || user.publicMetadata.role === "staff") {
        res.status(409).json({ error: "Full staff access cannot be removed here." });
        return;
      }
      if (user.publicMetadata.role !== "coach") {
        res.status(409).json({ error: "This account does not currently have coach access." });
        return;
      }
      await accounts.setRole(user.id, null);
      res.sendStatus(204);
    } catch (error) {
      req.log?.error({ err: error }, "Could not remove coach access");
      res.status(503).json({ error: "Coach access could not be removed. Please try again." });
    }
  });
  return router;
}

export default createCoachAccessRouter();
