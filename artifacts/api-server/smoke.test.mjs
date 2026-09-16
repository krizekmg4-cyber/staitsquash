import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, test } from "node:test";
import { runBundleSmoke } from "./smoke.mjs";

let fixtureDirectory;
let configuredPortServer;
let configuredPort;

before(async () => {
  fixtureDirectory = await mkdtemp(join(tmpdir(), "api-smoke-test-"));
  configuredPortServer = createServer();
  await new Promise((resolve, reject) => {
    configuredPortServer.once("error", reject);
    configuredPortServer.listen(0, "127.0.0.1", resolve);
  });
  const address = configuredPortServer.address();
  assert(address && typeof address !== "string");
  configuredPort = address.port;
  process.env.PORT = String(configuredPort);
});

after(async () => {
  await new Promise((resolve, reject) => {
    configuredPortServer.close((error) => (error ? reject(error) : resolve()));
  });
  await rm(fixtureDirectory, { recursive: true, force: true });
});

async function createFixture(name, source) {
  const path = join(fixtureDirectory, `${name}.mjs`);
  await writeFile(path, source);
  return path;
}

function assertProcessGone(pid) {
  assert.throws(
    () => process.kill(pid, 0),
    (error) => error?.code === "ESRCH",
    `expected child process ${pid} to be gone`,
  );
}

async function runFixture(entryPath, options = {}) {
  let childPid;
  await runBundleSmoke({
    entryPath,
    startupTimeoutMs: 5_000,
    shutdownTimeoutMs: 1_000,
    ...options,
    onSpawn(child) {
      childPid = child.pid;
    },
  });
  assertProcessGone(childPid);
}

test("passes after startup and removes the child process", async () => {
  const entryPath = await createFixture(
    "starts",
    `
      import { createServer } from "node:net";
      const server = createServer();
      server.listen(Number(process.env.PORT), "127.0.0.1", () => {
        console.log("Server listening");
      });
    `,
  );

  await runFixture(entryPath);
  assert.equal(configuredPortServer.listening, true);
});

test("fails on an early crash and leaves no child process", async () => {
  const entryPath = await createFixture(
    "crashes",
    `console.error("fixture crashed"); process.exit(23);`,
  );
  let childPid;

  await assert.rejects(
    runBundleSmoke({
      entryPath,
      startupTimeoutMs: 5_000,
      shutdownTimeoutMs: 1_000,
      onSpawn(child) {
        childPid = child.pid;
      },
    }),
    /exited before startup completed.*fixture crashed/s,
  );
  assertProcessGone(childPid);
  assert.equal(configuredPortServer.listening, true);
});

test("fails on startup timeout and removes the child process", async () => {
  const entryPath = await createFixture(
    "hangs",
    `setInterval(() => {}, 1_000);`,
  );
  let childPid;

  await assert.rejects(
    runBundleSmoke({
      entryPath,
      startupTimeoutMs: 50,
      shutdownTimeoutMs: 1_000,
      onSpawn(child) {
        childPid = child.pid;
      },
    }),
    /did not start within 50ms/,
  );
  assertProcessGone(childPid);
  assert.equal(configuredPortServer.listening, true);
});

test("force kills a child that ignores SIGTERM after startup timeout", async () => {
  const entryPath = await createFixture(
    "ignores-sigterm",
    `
      process.on("SIGTERM", () => {});
      setInterval(() => {}, 1_000);
    `,
  );
  let childPid;

  await assert.rejects(
    runBundleSmoke({
      entryPath,
      startupTimeoutMs: 200,
      shutdownTimeoutMs: 50,
      onSpawn(child) {
        childPid = child.pid;
      },
    }),
    /did not start within 200ms/,
  );
  assertProcessGone(childPid);
  assert.equal(configuredPortServer.listening, true);
});