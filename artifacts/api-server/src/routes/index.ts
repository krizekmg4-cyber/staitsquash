import { Router, type IRouter } from "express";
import healthRouter from "./health";
import trackerRouter from "./tracker";
import setupRouter from "./setup";
import storageRouter from "./storage";
import coachAccessRouter from "./coach-access";

const router: IRouter = Router();

router.use(healthRouter);
router.use(coachAccessRouter);
router.use(trackerRouter);
router.use(setupRouter);
router.use(storageRouter);

export default router;
