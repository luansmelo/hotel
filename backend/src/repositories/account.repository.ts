import { AccountRepositoryContract } from "../contracts/account-contract";
import { AccountInputContract } from "../dto/account.dto";
import { PrismaClient } from "@prisma/client";

export class AccountRepository implements AccountRepositoryContract {
  constructor(private readonly db: PrismaClient) {}
  async save(input: AccountInputContract) {
    return this.db.account.create({
      data: input,
      select: {
        id: true,
      },
    });
  }

  async getByEmail(email: string): Promise<AccountInputContract> {
    const db = await this.db.account.findUnique({ where: { email } });

    return db;
  }
}
