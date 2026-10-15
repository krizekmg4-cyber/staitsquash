import { Router, type RequestHandler } from "express";
import { clerkClient } from "@clerk/express";
import { configuredStaffIds, requireStaff } from "../middlewares/requireStaff.js";

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
  setRole: (id: string, role: "staff" | null) => Promise<void>;
};

const directory: AccountDirectory = {
  list: (offset) => clerkClient.users.getUserList({ offset, limit: 100 }),
  findByEmail: async (email) => (await clerkClient.users.getUserList({ emailAddress: [email], limit: 10 })).data,
  get: (id) => clerkClient.users.getUser(id),
  setRole: async (id, role) => { await clerkClient.users.updateUserMetadata(id, { publicMetadata: { role } }); },
};

function adminAccount(user: Account, email?: string) {
  return {
    id: user.id,
    email: email ?? user.emailAddresses.find((item) => item.verification?.status === "verified")?.emailAddress ?? "",
    name: [user.firstName, user.lastName].filter(Boolean).join(" ") || "Admin",
  };
}

/**
 * Lets an approved admin add or remove other admins from inside the app, so nobody has to edit
 * a Replit secret. Admins added here are stored on the sign-in account itself. Accounts listed in
 * the STAFF_CLERK_USER_IDS secret always stay admins and cannot be changed here.
 */
export function createAdminAccessRouter(dependencies: {
  directory?: AccountDirectory;
  authorizeStaff?: RequestHandler;
  isConfiguredStaff?: (id: string) => boolean;
} = {}) {
  const router = Router();
  const accounts = dependencies.directory ?? directory;
  const staff = dependencies.authorizeStaff ?? requireStaff;
  const isConfiguredStaff = dependencies.isConfiguredStaff ?? ((id) => configuredStaffIds().has(id));

  router.get("/admin-access", staff, async (req, res) => {
    res.set("Cache-Control", "no-store");
    try {
      const admins: Array<ReturnType<typeof adminAccount> & { locked: boolean }> = [];
      let offset = 0;
      while (true) {
        const page = await accounts.list(offset);
        for (const user of page.data) {
          const configured = isConfiguredStaff(user.id);
          if (configured || user.publicMetadata.role === "staff") admins.push({ ...adminAccount(user), locked: configured });
        }
        offset += page.data.length;
        if (offset >= page.totalCount || page.data.length === 0) break;
      }
      res.json({ admins, you: res.locals.staffUserId ?? null });
    } catch (error) {
      req.log?.error({ err: error }, "Could not list admin accounts");
      res.status(503).json({ error: "Admins could not be loaded. Please try again." });
    }
  });

  router.post("/admin-access", staff, async (req, res) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      res.status(400).json({ error: "Enter the email address the new admin used to sign up." });
      return;
    }
    try {
      const candidates = await accounts.findByEmail(email);
      const user = candidates.find((account) => account.emailAddresses.some(
        (address) => address.emailAddress.toLowerCase() === email && address.verification?.status === "verified",
      ));
      if (!user) {
        res.status(404).json({ error: "No verified account found. Ask them to open the app link, sign in once, then try again." });
        return;
      }
      if (user.banned || user.locked) {
        res.status(409).json({ error: "This account is blocked. Admin access cannot be approved." });
        return;
      }
      if (isConfiguredStaff(user.id) || user.publicMetadata.role === "staff") {
        res.status(409).json({ error: "This account is already an admin." });
        return;
      }
      await accounts.setRole(user.id, "staff");
      res.json(adminAccount(user, email));
    } catch (error) {
      req.log?.error({ err: error }, "Could not approve admin access");
      res.status(503).json({ error: "Admin access could not be approved. Please try again." });
    }
  });

  router.delete("/admin-access/:userId", staff, async (req, res) => {
    const userId = req.params.userId;
    if (typeof userId !== "string" || !/^user_[A-Za-z0-9]+$/.test(userId)) {
      res.status(400).json({ error: "Invalid admin account." });
      return;
    }
    if (userId === res.locals.staffUserId) {
      res.status(409).json({ error: "You cannot remove your own admin access." });
      return;
    }
    try {
      const user = await accounts.get(userId);
      if (isConfiguredStaff(user.id)) {
        res.status(409).json({ error: "This admin is set in the app's secrets and cannot be removed here." });
        return;
      }
      if (user.publicMetadata.role !== "staff") {
        res.status(409).json({ error: "This account is not an admin." });
        return;
      }
      await accounts.setRole(user.id, null);
      res.sendStatus(204);
    } catch (error) {
      req.log?.error({ err: error }, "Could not remove admin access");
      res.status(503).json({ error: "Admin access could not be removed. Please try again." });
    }
  });

  return router;
}

export default createAdminAccessRouter();
