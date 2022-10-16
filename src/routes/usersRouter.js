import express from "express";
import * as userController from "../controllers/usersController.js";
import * as userMiddleware from "../middlewares/usersMiddleware.js";

const usersRouter = express.Router();

usersRouter.post(
  "/signup",
  userMiddleware.signUpMiddleware,
  userController.insert
);

usersRouter.post(
  "/signin",
  userMiddleware.signInMiddleware,
  userController.login
);

export default usersRouter;
