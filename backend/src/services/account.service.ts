import {
  AccountRepositoryContract,
  AccountServiceContract,
} from "../contracts/account-contract";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { AccountInputContract } from "../dto/account.dto";
import { NotFoundError } from "../errors/httpErrors";

export class AccountService implements AccountServiceContract {
  constructor(private readonly accountRepository: AccountRepositoryContract) {}

  async create(input: AccountInputContract) {
    const account = await this.accountRepository.getByEmail(input.email);

    if (account) {
      throw new Error("Account already exists");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const payload = {
      ...input,
      password: hashedPassword,
    };

    const access_token = jwt.sign(payload, process.env.JWT_SECRET as Secret);

    await this.accountRepository.save(payload);

    return {
      access_token: access_token,
    };
  }

  async getByEmail(email: string): Promise<AccountInputContract> {
    const account = await this.accountRepository.getByEmail(email);

    if (!account) {
      throw new NotFoundError("Account not found");
    }

    return account;
  }
}
