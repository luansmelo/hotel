import { ROLE } from "@/config/constants";
import { CreateUserContract, UserModel } from "@/contracts/user/CreateUserContract";
import { FindUsersContract } from "@/contracts/user/FindAllUsers";
import { FindUserByTokenContract } from "@/contracts/user/FindUserByTokenAndRole";
import { FindUserByEmailContract } from "@/contracts/user/FindUseryByEmailContract";
import { CreateUserModel } from "@/entities/user/createUser";
import User from "@/data/local/entity/user";
import { CreateUserRepository } from "@/data/protocols/db/user/CreateUserRepository.protocol";

export class UserRepository
  implements CreateUserRepository,
  FindUserByEmailContract,
  FindUserByTokenContract,
  FindUsersContract {

  async create(input: CreateUserModel): Promise<UserModel> {
  
    return User.create({
      data: {
        ...input,
        role: input.role as ROLE
      },
    });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return User.findUnique({ where: { email } });
  }

  async findByIdAndRole(id: string, role?: string): Promise<UserModel | null> {

    return User.findUnique({
      where: {
        id,
        role: role as ROLE,
      }
    });
  }

  async findUsers(): Promise<UserModel[]> {
    return User.findMany()
  }
}
