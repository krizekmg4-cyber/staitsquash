import { clerkClient, getAuth } from "@clerk/express";
import type { Request, RequestHandler } from "express";

type StaffAuthorizationDependencies = {
  getUserId: (req: Request) => string | null;
  isApprovedStaff: (userId: string) => Promise<boolean>;
};

export function configuredStaffIds(): Set<string> {
  return new Set(
    (process.env["STAFF_CLERK_USER_IDS"] ?? "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
  );
}

async function isApprovedClerkStaff(userId: string): Promise<boolean> {
  return (await getTrackerRole(userId)) === "staff";
}

export type TrackerRole = "staff" | "coach";

export async function getTrackerRole(userId: string): Promise<TrackerRole | null> {
  if (configuredStaffIds().has(userId)) return "staff";
  const user = await clerkClient.users.getUser(userId);
  if (user.banned || user.locked) return null;
  const role = user.publicMetadata["role"];
  return role === "staff" || role === "coach" ? role : null;
}

export function createRequireTrackerAccess(dependencies: {
  getUserId: (req: Request) => string | null;
  getRole: (userId: string) => Promise<TrackerRole | null>;
}): RequestHandler {
  return async (req, res, next) => {
    const userId = dependencies.getUserId(req);
    if (!userId) {
      res.status(401).json({ error: "Sign-in required" });
      return;
    }
    try {
      const role = await dependencies.getRole(userId);
      if (!role) {
        res.status(403).json({ error: "This account is not approved for tracker access" });
        return;
      }
      res.locals.trackerRole = role;
      res.locals.trackerUserId = userId;
      if (role === "staff") res.locals.staffUserId = userId;
      next();
    } catch (error) {
      req.log?.error({ err: error, userId }, "Could not verify tracker access");
      res.status(503).json({ error: "Tracker access could not be verified" });
    }
  };
}

export const requireTrackerAccess = createRequireTrackerAccess({
  getUserId: (req) => {
    const auth = getAuth(req);
    const claimUserId = auth.sessionClaims?.userId;
    return typeof claimUserId === "string" ? claimUserId : auth.userId;
  },
  getRole: getTrackerRole,
});

export function createRequireStaff(
  dependencies: StaffAuthorizationDependencies = {
    getUserId: (req) => {
      const auth = getAuth(req);
      const claimUserId = auth.sessionClaims?.userId;
      return typeof claimUserId === "string" ? claimUserId : auth.userId;
    },
    isApprovedStaff: isApprovedClerkStaff,
  },
): RequestHandler {
  return async (req, res, next) => {
    const userId = dependencies.getUserId(req);
    if (!userId) {
      res.status(401).json({ error: "Staff sign-in required" });
      return;
    }

    try {
      if (!(await dependencies.isApprovedStaff(userId))) {
        res.status(403).json({ error: "This account is not approved for staff access" });
        return;
      }
    } catch (error) {
      req.log?.error({ err: error, userId }, "Could not verify staff access");
      res.status(503).json({ error: "Staff access could not be verified" });
      return;
    }

    res.locals.staffUserId = userId;
    next();
  };
}

export const requireStaff = createRequireStaff();