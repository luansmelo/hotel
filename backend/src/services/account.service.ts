import {
  AccountRepositoryContract,
  AccountServiceContract,
} from "../contracts/account-contract";
import { AccountDTO } from "../dto/account.dto";
import { NotFoundError } from "../errors/httpErrors";

export class AccountService implements AccountServiceContract {
  constructor(private readonly accountRepository: AccountRepositoryContract) {}

  async create(input: AccountDTO) {
    await this.accountRepository.getByEmail(input.email);

    return this.accountRepository.save(input);
  }

  async getByEmail(email: string): Promise<AccountDTO | null> {
    const account = await this.accountRepository.getByEmail(email);

    if (!account) {
      throw new NotFoundError("Account not found");
    }

    return account;
  }
}
