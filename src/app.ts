import cors from "cors";
import express from "express";
import morgan from "morgan";
import { initLogger } from "./logger";
import { routes } from "./routes";

export const app = express();

export let { logger, stream } = initLogger();
let morganMiddleware = morgan("combined", { stream });

app.use(express.json({ limit: "5MB" }));
app.use(cors());
app.use(morganMiddleware);
app.get("/", (req, res) => {
  return res.status(200).json({ message: "HELLO!" });
});
app.use(routes);
