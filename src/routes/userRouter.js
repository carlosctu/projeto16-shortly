import express from "express";
import { authentication } from "../middlewares/auth.js";
import * as userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/users/me", authentication, userController.list);
export default userRouter;
