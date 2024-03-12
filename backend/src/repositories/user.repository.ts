import { CreateUserContract, UserModel } from "@/contracts/user/CreateUserContract";
import { FindUserByEmailContract } from "@/contracts/user/FindUseryByEmailContract";
import { CreateUserModel } from "@/entities/user/createUser";
import { PrismaClient } from "@prisma/client";

export class UserRepository
  implements CreateUserContract, FindUserByEmailContract
{
  constructor(private readonly db: PrismaClient) {}
  async save(input: CreateUserModel): Promise<UserModel> {
    return this.db.user.create({
      data: input,
    });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.db.user.findUnique({ where: { email } });
  }
}
