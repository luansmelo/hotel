import { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

interface MyKnexConfig {
  [key: string]: Knex.Config;
}


console.log(process.env.HOST, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, process.env.MYSQL_DATABASE);

const config: MyKnexConfig = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
    migrations: {
      directory: './src/database/migrations'
    }
  },
};

export default config;
