import assert from "node:assert/strict";
import { request } from "node:http";
import type { AddressInfo } from "node:net";
import test from "node:test";

test("production startup health checks work without a public host and private routes still require sign-in", async () => {
  const previousEnvironment = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  const { default: app } = await import("./app.js");
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const port = (server.address() as AddressInfo).port;
  try {
    for (const host of ["127.0.0.1", "startup-probe.internal.invalid"]) {
      const response = await new Promise<{ status: number; body: string }>((resolve, reject) => {
        const req = request({
          hostname: "127.0.0.1", port, path: "/api/healthz", setHost: false,
          headers: { Host: host },
        }, (res) => {
          let body = "";
          res.on("data", (chunk) => { body += chunk; });
          res.on("end", () => resolve({ status: res.statusCode!, body }));
        });
        req.on("error", reject);
        req.end();
      });
      assert.equal(response.status, 200);
      assert.deepEqual(JSON.parse(response.body), { status: "ok" });
    }
    const protectedResponse = await fetch(`http://127.0.0.1:${port}/api/tracker`, {
      headers: { Host: "startup-probe.internal.invalid" },
    });
    assert.equal(protectedResponse.status, 401);
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    if (previousEnvironment === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousEnvironment;
  }
});
