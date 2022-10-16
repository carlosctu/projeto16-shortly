import express from "express";
import * as rankingController from "../controllers/rankingController.js"

const rankingRouter = express.Router();

rankingRouter.get("/ranking", rankingController.list);
export default rankingRouter;
