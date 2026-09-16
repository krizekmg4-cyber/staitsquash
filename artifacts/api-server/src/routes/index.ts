import { Router, type IRouter } from "express";
import healthRouter from "./health";
import trackerRouter from "./tracker";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(trackerRouter);
router.use(storageRouter);

export default router;
