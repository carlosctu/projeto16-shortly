import express from "express";
import urlsRouter from "./urlsRouter.js";
import usersRouter from "./usersRouter.js";

const router = express.Router();
router.use(usersRouter);
router.use(urlsRouter)

export default router;
