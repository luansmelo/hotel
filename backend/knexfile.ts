import { Knex } from "knex";

interface MyKnexConfig {
  [key: string]: Knex.Config;
}

const config: MyKnexConfig = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
  },
};

export default config;
