import { mkdtemp, readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { build } from "esbuild";

async function findTests(directory, extension = ".test.ts") {
  const entries = await readdir(directory, { withFileTypes: true });
  const tests = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return findTests(path, extension);
      return entry.name.endsWith(extension) ? [path] : [];
    }),
  );
  return tests.flat();
}

const testFiles = process.argv.slice(2);
const entryPoints = testFiles.length > 0 ? testFiles : await findTests("src");
const outputDirectory = await mkdtemp(join(process.cwd(), ".test-dist-"));

try {
  await build({
    entryPoints,
    outdir: outputDirectory,
    outbase: "src",
    bundle: true,
    format: "esm",
    platform: "node",
    plugins: [
      {
        name: "externalize-third-party-packages",
        setup(build) {
          build.onResolve({ filter: /^[^./]/ }, (args) => {
            if (args.path === "@workspace/db") {
              return { path: args.path, external: true };
            }
            if (args.path === "zod") return;
            if (args.path.startsWith("@workspace/")) return;
            return { path: args.path, external: true };
          });
        },
      },
    ],
    sourcemap: "inline",
  });

  const testProcess = spawn(
    process.execPath,
    ["--test", ...(await findTests(outputDirectory, ".test.js"))],
    { stdio: "inherit" },
  );

  const exitCode = await new Promise((resolve, reject) => {
    testProcess.once("error", reject);
    testProcess.once("exit", (code, signal) => {
      if (signal) reject(new Error(`Test process exited from signal ${signal}`));
      else resolve(code ?? 1);
    });
  });

  process.exitCode = exitCode;
} finally {
  await rm(outputDirectory, { recursive: true, force: true });
}