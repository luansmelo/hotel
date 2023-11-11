import { AccountService } from "../../data/services/account";
import { postgresDB } from "../../infra/data-sources/postgres";
import { PostgresAccountRepository } from "../../infra/repositories/postgres/account";
import { SignUpController } from "../../presentation/controllers/signup";

export function makePostgresAccountController(): SignUpController {
  const repo = new PostgresAccountRepository(postgresDB);
  const service = new AccountService(repo);
  return new SignUpController(service);
}
