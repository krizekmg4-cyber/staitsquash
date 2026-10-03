import { randomBytes } from "node:crypto";

/**
 * A secret that exists only inside this server process. The built-in refresh
 * timer sends it so its own request is accepted as staff, and nothing outside
 * the process can ever learn it.
 */
export const SCHEDULER_TOKEN = randomBytes(24).toString("hex");
