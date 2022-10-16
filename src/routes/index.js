import express from "express";
import authenticationRouter from "./authenticationRouter.js";
import rankingRouter from "./ranking.js";
import urlsRouter from "./urlsRouter.js";
import userRouter from "./userRouter.js";

const router = express.Router();
router.use(urlsRouter);
router.use(userRouter);
router.use(rankingRouter);
router.use(authenticationRouter);

export default router;
