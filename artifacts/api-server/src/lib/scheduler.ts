import { logger } from "./logger";
import { SCHEDULER_TOKEN } from "./scheduler-token";
import { getSetupRow } from "../routes/tracker";
import { isActive, setupToDrawsConfig } from "./weekly-setup";

const EVERY_MS = 5 * 60 * 1000;

/**
 * Refresh the draws on a timer, so match changes are picked up even when
 * nobody has the board open. It skips quietly when nothing is set up, so it
 * never counts as a failure. It only runs while this server is awake.
 */
export function startScheduledRefresh(port: number): void {
  if (process.env["SCHEDULED_REFRESH"] === "off") return;
  let running = false;
  const tick = async () => {
    if (running) return;
    running = true;
    try {
      let setup;
      try {
        setup = await getSetupRow();
      } catch {
        return;
      }
      const config = setupToDrawsConfig(setup);
      const anyActive =
        setup.tournaments.some((tournament) => isActive(tournament)) ||
        Boolean(process.env["CLUB_LOCKER_TOURNAMENT_IDS"]);
      if (!config || !anyActive || config.rosterIds.size === 0) return;
      const response = await fetch(`http://127.0.0.1:${port}/api/tracker/refresh`, {
        method: "POST",
        headers: { "x-scheduler-token": SCHEDULER_TOKEN },
      });
      if (!response.ok) logger.warn({ status: response.status }, "Scheduled refresh did not succeed");
    } catch (error) {
      logger.warn({ err: error }, "Scheduled refresh could not run");
    } finally {
      running = false;
    }
  };
  setInterval(() => void tick(), EVERY_MS).unref();
}
