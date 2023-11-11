import { Account } from "../../domain/entities/account";
import {
  AccountUseCases,
  CreateAccountInput,
} from "../../domain/use-cases/account";
import { AccountContract } from "../contracts/domain/account";
import {
  AccountRepository,
  CreateAccountInputRepo,
} from "../contracts/repositories/account";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

export class AccountService implements AccountUseCases {
  constructor(private readonly repo: AccountRepository) {}
  async create(input: CreateAccountInput): Promise<AccountContract> {
    const hash = await bcrypt.hash(input.password, 10);

    const data: CreateAccountInputRepo = {
      id: randomUUID(),
      name: input.name,
      email: input.email,
      password: hash,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return this.repo.create(data);
  }
  async getByID(input: string): Promise<AccountContract> {
    return this.repo.getByID(input);
  }
}
