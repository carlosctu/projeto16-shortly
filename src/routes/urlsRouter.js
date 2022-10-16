import express from "express";
import * as urlsMiddleware from "../middlewares/urlsMiddleware.js";
import * as urlsController from "../controllers/urlsController.js";

const urlsRouter = express.Router();

urlsRouter.post(
  "/urls/shorten",
  urlsMiddleware.shortenUrlMiddlware,
  urlsController.createShortenUrl
);

export default urlsRouter;
