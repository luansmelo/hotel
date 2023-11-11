import { AuthRepositoryContract } from "../contracts/auth-contract";
import { AccountInputContract } from "../dto/account.dto";
import { PrismaClient } from "@prisma/client";

export class AuthRepository implements AuthRepositoryContract {
  constructor(private readonly db: PrismaClient) {}
  async signin(input: string): Promise<AccountInputContract> {
    const db = await this.db.account.findFirst({
      where: {
        email: input,
      },
    });

    if (!db) throw new Error("Account not found");

    return db;
  }
}
