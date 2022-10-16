import express from "express";
import * as authenticationController from "../controllers/authenticationController.js";
import * as authenticationMiddleware from "../middlewares/authenticationMiddleware.js";

const authenticationRouter = express.Router();

authenticationRouter.post(
  "/signup",
  authenticationMiddleware.signUpMiddleware,
  authenticationController.insert
);

authenticationRouter.post(
  "/signin",
  authenticationMiddleware.signInMiddleware,
  authenticationController.login
);

export default authenticationRouter;
