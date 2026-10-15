import { Router, type IRouter } from "express";
import trackerRouter from "./tracker";
import setupRouter from "./setup";
import storageRouter from "./storage";
import coachAccessRouter from "./coach-access";
import adminAccessRouter from "./admin-access";

const router: IRouter = Router();

router.use(coachAccessRouter);
router.use(adminAccessRouter);
router.use(trackerRouter);
router.use(setupRouter);
router.use(storageRouter);

export default router;
