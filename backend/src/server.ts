import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mainRouter from "./routes";
import errorHandler from "./middlewares/errorHandler";
import { HttpError } from "./utils/errors/httpErrors";

dotenv.config();

export class Server {
  private app: Application;
  private readonly port: number;
  private version: number | string;
  private url: string;
  private server: any;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.API_PORT || "5000");
    this.version = process.env.API_VERSION || 1;
    this.url = process.env.API_URL || "localhost";
    this.app.use(
      cors({
        origin: ["http://localhost:3000"],
      })
    );

    this.app.use(express.json());

    this.app.use(`/v${this.version}`, mainRouter);
    this.middleware();
  }

  middleware(): void {
    this.app.use(
      (err: HttpError, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof HttpError) {
          return err.sendResponse(res);
        }
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    );
  }

  public start(): Application {
    this.server = this.app.listen(this.port, () => {
      console.log(
        `Servidor rodando em ${this.url}:${this.port}/v${this.version}`
      );
    });

    return this.app;
  }

  public stop(): void {
    this.server.close();
  }
}
