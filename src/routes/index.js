import express from "express";
import usersRouter from "./usersRouter.js";

const router = express.Router();
router.use(usersRouter);

export default router;
