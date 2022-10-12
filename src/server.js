import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const server = express();
server.use(express.json());
server.use(cors());
server.use(router);

server.listen(4000, () => {
  console.log("Magic happens on port 4000");
});
