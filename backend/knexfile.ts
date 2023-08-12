import { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

interface MyKnexConfig {
  [key: string]: Knex.Config;
}

const isDocker = process.env.IS_DOCKER === "true";
const DB_HOST = isDocker ? process.env.DB_HOST_DOCKER : process.env.HOST;

const config: MyKnexConfig = {
  development: {
    client: "mysql",
    connection: {
      host: DB_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
    migrations: {
      directory: "./src/database/migrations",
    },
  },
};

export default config;
