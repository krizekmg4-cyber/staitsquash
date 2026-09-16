import { clerkClient, getAuth } from "@clerk/express";
import type { Request, RequestHandler } from "express";

type StaffAuthorizationDependencies = {
  getUserId: (req: Request) => string | null;
  isApprovedStaff: (userId: string) => Promise<boolean>;
};

function configuredStaffIds(): Set<string> {
  return new Set(
    (process.env["STAFF_CLERK_USER_IDS"] ?? "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
  );
}

async function isApprovedClerkStaff(userId: string): Promise<boolean> {
  if (configuredStaffIds().has(userId)) return true;

  const user = await clerkClient.users.getUser(userId);
  return user.publicMetadata["role"] === "staff";
}

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