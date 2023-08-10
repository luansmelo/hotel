import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mainRouter from "./routes";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(mainRouter);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Servidor rodando em ${process.env.API_URL}:${process.env.PORT}/v${process.env.API_VERSION}`
  );
});
