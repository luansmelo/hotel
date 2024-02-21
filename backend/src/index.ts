import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mainRouter from "./routes";
import errorHandler from "./middlewares/errorHandler";
import env from "./config/env";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(env.api_version, mainRouter);
app.use(errorHandler);

const server = app.listen(env.port, () => {
  console.log(
    `Servidor rodando em ${env.API_URL}:${env.port}${env.api_version}`
  );
});

export { app, server };
