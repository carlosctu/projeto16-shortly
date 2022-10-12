import express from "express";
import * as userController from "../controllers/usersController.js";
import * as userMiddleware from "../middlewares/usersMiddleware.js";

const usersRouter = express.Router();

usersRouter.post(
  "/signup",
  userMiddleware.userMiddleware,
  userController.insert
);

export default usersRouter;
