import { InputService } from "../../data/services/input";
import { postgresDB } from "../../infra/data-sources/postgres";
import { PostgresInputRepository } from "../../infra/repositories/postgres/input";
import { InputController } from "../../presentation/controllers/input";

export function makePostgresInputController(): InputController {
  const repo = new PostgresInputRepository(postgresDB);
  const service = new InputService(repo);
  const controller = new InputController(service);
  return controller;
}
