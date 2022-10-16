import express from "express";
import * as urlsMiddleware from "../middlewares/urlsMiddleware.js";
import * as urlsController from "../controllers/urlsController.js";

const urlsRouter = express.Router();

urlsRouter.post(
  "/urls/shorten",
  urlsMiddleware.authenticationMiddleware,
  urlsMiddleware.shortenUrlMiddleware,
  urlsController.createShortenUrl
);
urlsRouter.get("/urls/:id", urlsController.getUrl);
urlsRouter.get("/urls/open/:shortUrl", urlsController.openUrl);
urlsRouter.delete(
  "/urls/:id",
  urlsMiddleware.authenticationMiddleware,
  urlsController.deleteUrl
);
export default urlsRouter;
