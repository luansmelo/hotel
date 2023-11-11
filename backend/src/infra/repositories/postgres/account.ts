import { PrismaClient } from "@prisma/client";
import { AccountContract } from "../../../data/contracts/domain/account";
import {
  AccountRepository,
  CreateAccountInputRepo,
} from "../../../data/contracts/repositories/account";
  
export class PostgresAccountRepository implements AccountRepository {
  constructor(private readonly db: PrismaClient) {}
  async create(input: CreateAccountInputRepo): Promise<AccountContract> {
    const db = await this.db.account.create({
      data: input,
    });

    return db;
  }
  async getByID(input: string): Promise<AccountContract> {
    const db = {
      id: "1",
      created_at: "123",
      name: "123",
      email: "xdxd@",
      password: "123",
      updated_at: "123",
    };

    return db;
  }
}
