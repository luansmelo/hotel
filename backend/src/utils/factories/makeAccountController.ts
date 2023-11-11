import { AccountController } from "../../controllers/account.controller";
import prisma from "../../database";
import { AccountRepository } from "../../repositories/account.repository";
import { AccountService } from "../../services/account.service";

export function makeAccountController(): AccountController {
  const accountRepository = new AccountRepository(prisma);
  const accountService = new AccountService(accountRepository);
  const accountController = new AccountController(accountService);
  return accountController;
}
