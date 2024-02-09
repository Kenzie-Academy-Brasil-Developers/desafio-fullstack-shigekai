import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import { router } from "./routes/index.routes";
import { handleError } from "./middlewares/handleError.middleware";

export const app: Application = express();

app.use(express.json());


app.use("/", router);

app.use(handleError);
