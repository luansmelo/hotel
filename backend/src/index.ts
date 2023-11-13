import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mainRouter from "./routes";
import errorHandler from "./middleware/errorHandler";
import env from "./config/env";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(env.api_version, mainRouter);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(
    `Servidor rodando em ${process.env.API_URL}:${env.port}${env.api_version}`
  );
});
