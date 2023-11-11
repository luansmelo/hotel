import { AccountServiceContract } from "../contracts/account-contract";
import { AccountInputContract } from "../dto/account.dto";

export class AccountController {
  constructor(private readonly inputService: AccountServiceContract) {}

  async create(input: AccountInputContract) {
    return this.inputService.create(input);
  }

  async getByEmail(email: string) {
    return this.inputService.getByEmail(email);
  }
}
