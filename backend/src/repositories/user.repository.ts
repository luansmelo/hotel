import { CreateUserContract, UserModel } from "@/contracts/user/createUser";
import { UserDataContract } from "@/dto/user/user.dto";
import { CreateUserModel } from "@/entities/user/createUser";
import { PrismaClient } from "@prisma/client";

export class UserRepository implements CreateUserContract {
  constructor(private readonly db: PrismaClient) {}
  async save(input: CreateUserModel): Promise<UserModel> {
    return this.db.user.create({
      data: input,
    });
  }

  async getByEmail(email: string): Promise<UserDataContract> {
    const db = await this.db.user.findUnique({ where: { email } });

    return db;
  }
}
