import { UserData } from "../dto/user.dto";
import { UserRepositoryContract } from "../utils/contracts/user-contract";
import { PrismaClient } from "@prisma/client";

export class UserRepository implements UserRepositoryContract {
  constructor(private readonly db: PrismaClient) {}
  async save(input: UserData) {
    return this.db.user.create({
      data: input,
    });
  }
  async getByEmail(email: string): Promise<UserData> {
    const db = await this.db.user.findUnique({ where: { email } });

    return db;
  }
}
