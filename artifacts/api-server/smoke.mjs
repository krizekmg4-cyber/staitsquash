import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";

const defaultEntryPath = fileURLToPath(
  new URL("./dist/index.mjs", import.meta.url),
);

async function allocatePort() {
  return new Promise((resolve, reject) => {
    const reservation = createServer();
    reservation.once("error", reject);
    reservation.listen(0, "127.0.0.1", () => {
      const address = reservation.address();
      if (!address || typeof address === "string") {
        reservation.close();
        reject(new Error("Could not allocate an ephemeral port."));
        return;
      }
      reservation.close((error) => {
        if (error) reject(error);
        else resolve(address.port);
      });
    });
  });
}

export async function runBundleSmoke({
  entryPath = defaultEntryPath,
  startupTimeoutMs = 10_000,
  shutdownTimeoutMs = 5_000,
  onSpawn,
} = {}) {
  const output = [];
  const port = await allocatePort();
  const child = spawn(process.execPath, ["--enable-source-maps", entryPath], {
    env: {
      ...process.env,
      NODE_ENV: "production",
      PORT: String(port),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  onSpawn?.(child);

  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");

  let startupTimeout;
  let shutdownTimeout;
  let startupConfirmed = false;
  let failure;

  function stopChild() {
    if (child.killed) return;
    child.kill("SIGTERM");
    shutdownTimeout = setTimeout(
      () => child.kill("SIGKILL"),
      shutdownTimeoutMs,
    );
  }

  function remember(chunk) {
    output.push(chunk);
    if (!startupConfirmed && output.join("").includes("Server listening")) {
      startupConfirmed = true;
      clearTimeout(startupTimeout);
      stopChild();
    }
  }

  child.stdout.on("data", remember);
  child.stderr.on("data", remember);

  await new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      clearTimeout(startupTimeout);
      clearTimeout(shutdownTimeout);

      if (startupConfirmed && !failure) {
        resolve();
        return;
      }

      const details = output.join("").trim();
      reject(
        failure ??
          new Error(
            `API bundle exited before startup completed (code ${code}, signal ${signal}).${
              details ? `\n${details}` : ""
            }`,
          ),
      );
    });

    startupTimeout = setTimeout(() => {
      const details = output.join("").trim();
      failure = new Error(
        `API bundle did not start within ${startupTimeoutMs}ms.${
          details ? `\n${details}` : ""
        }`,
      );
      stopChild();
    }, startupTimeoutMs);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await runBundleSmoke();
  console.log("API bundle smoke check passed.");
}