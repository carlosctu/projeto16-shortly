import express from "express";
import authenticationRouter from "./authenticationRouter.js";
import urlsRouter from "./urlsRouter.js";

const router = express.Router();
router.use(authenticationRouter);
router.use(urlsRouter)

export default router;
