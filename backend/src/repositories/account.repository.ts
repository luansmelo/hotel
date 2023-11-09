import prisma from "../database";
import { AccountRepositoryContract } from "../contracts/account-contract";
import { AccountDTO } from "../dto/account.dto";

export class AccountRepository implements AccountRepositoryContract {
  async save(input: AccountDTO) {
    return prisma.account.create({
      data: input,
    });
  }

  async getByEmail(email: string): Promise<AccountDTO | null> {
    const db = await prisma.account.findUnique({ where: { email } });

    return db;
  }
}
