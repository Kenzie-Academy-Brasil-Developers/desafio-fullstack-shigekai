import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import { router } from "./routes/index.routes";
import { handleError } from "./middlewares/handleError.middleware";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

export const app: Application = express();

const cors = require("cors");

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());

app.use("/", router);

app.use(handleError);
