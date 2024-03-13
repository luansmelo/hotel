import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mainRouter from "./routes";

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
