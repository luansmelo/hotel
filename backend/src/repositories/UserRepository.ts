import { CreateUserContract, UserModel } from "@/contracts/user/CreateUserContract";
import { FindUserByTokenContract } from "@/contracts/user/FindUserByTokenAndRole";
import { FindUserByEmailContract } from "@/contracts/user/FindUseryByEmailContract";
import { CreateUserModel } from "@/entities/user/createUser";
import { PrismaClient, Role } from "@prisma/client";

export class UserRepository
  implements CreateUserContract, FindUserByEmailContract, FindUserByTokenContract {
  constructor(private readonly db: PrismaClient) { }
  async save(input: CreateUserModel): Promise<UserModel> {
    return this.db.user.create({
      data: input,
    });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.db.user.findUnique({ where: { email } });
  }

  async findByIdAndRole(id: string, role?: string): Promise<UserModel | null> {
    console.log(id, role)
    return this.db.user.findUnique({
      where: {
        id,
        role: role as Role,
      }
    });
  }
}
