import { Router, type IRouter } from "express";
import { ObjectNotFoundError, ObjectStorageService } from "../lib/object-storage.js";

const router: IRouter = Router();
const storage = new ObjectStorageService();

router.get("/storage/objects/*path", async (req, res): Promise<void> => {
  const raw = req.params.path;
  const path = Array.isArray(raw) ? raw.join("/") : raw;
  try {
    await storage.stream(await storage.getObject(`/objects/${path}`), res);
  } catch (error) {
    if (error instanceof ObjectNotFoundError) {
      res.status(404).json({ error: "Object not found" });
      return;
    }
    req.log.error({ err: error }, "Could not serve stored object");
    res.status(500).json({ error: "Could not serve stored object" });
  }
});

export default router;