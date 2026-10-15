import assert from "node:assert/strict";
import test from "node:test";
import express, { type Express } from "express";
import { createAdminAccessRouter } from "./admin-access.js";
import { createRequireStaff, type TrackerRole } from "../middlewares/requireStaff.js";

async function withServer(app: Express, run: (url: string) => Promise<void>) {
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  try { await run(`http://127.0.0.1:${address.port}`); }
  finally { await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())); }
}

function account(id: string, role: string | null = null, verified = true) {
  return {
    id, firstName: "Test", lastName: id, banned: false, locked: false,
    publicMetadata: { role, unrelated: "preserve" } as Record<string, unknown>,
    emailAddresses: [{ emailAddress: `${id}@example.com`, verification: { status: verified ? "verified" : "unverified" } }],
  };
}

function fixture() {
  const users = [account("user_env"), account("user_staff", "staff"), account("user_coach", "coach"), account("user_new"), account("user_unverified", null, false)];
  let caller: string | null = "user_staff";
  const find = (id: string) => {
    const user = users.find((item) => item.id === id);
    if (!user) throw new Error("Not found");
    return user;
  };
  const getRole = async (id: string): Promise<TrackerRole | null> => {
    if (id === "user_env") return "staff";
    const role = find(id).publicMetadata.role;
    return role === "staff" || role === "coach" ? role : null;
  };
  const staff = createRequireStaff({ getUserId: () => caller, isApprovedStaff: async (id) => await getRole(id) === "staff" });
  const app = express();
  app.use(express.json());
  app.use(createAdminAccessRouter({
    authorizeStaff: staff, isConfiguredStaff: (id) => id === "user_env",
    directory: {
      list: async (offset) => ({ data: users.slice(offset, offset + 2), totalCount: users.length }),
      findByEmail: async (email) => users.filter((item) => item.emailAddresses.some((address) => address.emailAddress === email)),
      get: async (id) => find(id),
      setRole: async (id, role) => { find(id).publicMetadata.role = role; },
    },
  }));
  return { app, users, caller: (id: string | null) => { caller = id; } };
}

const post = (url: string, email: string) => fetch(`${url}/admin-access`, {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }),
});

test("an admin lists admins, with secret-configured ones marked locked, and sees their own id", async () => {
  const f = fixture();
  await withServer(f.app, async (url) => {
    const list = await (await fetch(`${url}/admin-access`)).json() as { admins: Array<{ id: string; locked: boolean }>; you: string };
    assert.deepEqual(list.admins.map((item) => [item.id, item.locked]), [["user_env", true], ["user_staff", false]]);
    assert.equal(list.you, "user_staff");
  });
});

test("approving an admin needs a verified existing account and keeps unrelated metadata", async () => {
  const f = fixture();
  await withServer(f.app, async (url) => {
    assert.equal((await post(url, "bad")).status, 400);
    assert.equal((await post(url, "missing@example.com")).status, 404);
    assert.equal((await post(url, "user_unverified@example.com")).status, 404);
    assert.equal((await post(url, "user_staff@example.com")).status, 409);
    assert.equal((await post(url, "user_env@example.com")).status, 409);
    const response = await post(url, "user_new@example.com");
    assert.equal(response.status, 200);
    assert.deepEqual(f.users[3].publicMetadata, { role: "staff", unrelated: "preserve" });
    assert.equal((await post(url, "user_coach@example.com")).status, 200);
    assert.equal(f.users[2].publicMetadata.role, "staff");
  });
});

test("only admins can manage admins; you cannot remove yourself or a secret-configured admin", async () => {
  const f = fixture();
  await withServer(f.app, async (url) => {
    for (const who of [null, "user_coach", "user_new"]) {
      f.caller(who);
      for (const method of ["GET", "POST", "DELETE"]) {
        const path = method === "DELETE" ? "/admin-access/user_staff" : "/admin-access";
        assert.ok([401, 403].includes((await fetch(`${url}${path}`, { method })).status));
      }
    }
    f.caller("user_staff");
    assert.equal((await fetch(`${url}/admin-access/user_staff`, { method: "DELETE" })).status, 409);
    assert.equal((await fetch(`${url}/admin-access/user_env`, { method: "DELETE" })).status, 409);
    assert.equal((await fetch(`${url}/admin-access/user_coach`, { method: "DELETE" })).status, 409);
    assert.equal((await fetch(`${url}/admin-access/nope`, { method: "DELETE" })).status, 400);
    await post(url, "user_new@example.com");
    assert.equal((await fetch(`${url}/admin-access/user_new`, { method: "DELETE" })).status, 204);
    assert.equal(f.users[3].publicMetadata.role, null);
    assert.equal(f.users[3].publicMetadata.unrelated, "preserve");
  });
});
