import express from "express";
import * as urlsMiddleware from "../middlewares/urlsMiddleware.js";

const urlsRouter = express.Router();

urlsRouter.post("/urls/shorten", urlsMiddleware.shortenUrlMiddlware);

export default urlsRouter;
