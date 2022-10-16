import express from "express";
import * as urlsMiddleware from "../middlewares/urlsMiddleware.js";
import * as urlsController from "../controllers/urlsController.js";
import { authentication } from "../middlewares/auth.js";

const urlsRouter = express.Router();

urlsRouter.post(
  "/urls/shorten",
  authentication,
  urlsMiddleware.shortenUrlMiddleware,
  urlsController.createShortenUrl
);
urlsRouter.get("/urls/:id", urlsController.getUrl);
urlsRouter.get("/urls/open/:shortUrl", urlsController.openUrl);
urlsRouter.delete("/urls/:id", authentication, urlsController.deleteUrl);
export default urlsRouter;
