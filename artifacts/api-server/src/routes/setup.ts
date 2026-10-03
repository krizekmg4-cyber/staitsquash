import { createSetupRouter } from "../lib/weekly-setup.js";
import { requireStaff } from "../middlewares/requireStaff.js";
import {
  applyTournamentCoachToMatches,
  knownCoaches,
  knownPlayers,
} from "./tracker.js";
import { getSetupForRouter, saveSetupForRouter } from "./setup-store.js";

export default createSetupRouter({
  getSetup: getSetupForRouter,
  saveSetup: saveSetupForRouter,
  getKnownPlayers: knownPlayers,
  getCoaches: knownCoaches,
  applyTournamentCoach: applyTournamentCoachToMatches,
  authorizeStaff: requireStaff,
});
