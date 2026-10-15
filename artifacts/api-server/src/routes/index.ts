import { Router, type IRouter } from "express";
import trackerRouter from "./tracker";
import setupRouter from "./setup";
import storageRouter from "./storage";
import coachAccessRouter from "./coach-access";
import adminAccessRouter from "./admin-access";
import archiveRouter from "./archive";

const router: IRouter = Router();

router.use(coachAccessRouter);
router.use(adminAccessRouter);
router.use(archiveRouter);
router.use(trackerRouter);
router.use(setupRouter);
router.use(storageRouter);

export default router;
