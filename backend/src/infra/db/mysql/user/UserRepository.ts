import User from "@/data/local/entity/user";
import { ROLE } from "@/config/constants";
import { CreateUserModel } from "@/entities/user/createUser";
import { CreateUserRepository } from "@/data/protocols/db/user/CreateUserRepository.protocol";
import { UserModel } from "@/domain/models/User";
import { LoadUserByEmailRepository } from "@/data/protocols/db/user/LoadUserByEmailRepository.protocol";
import { LoadUsersRepository } from "@/data/protocols/db/user/LoadUsersRepository.protocol";
import { LoadUserByTokenRepository } from "@/data/protocols/db/user/LoadUserByTokenRepository.protocol";

export class UserRepository
  implements CreateUserRepository,
  LoadUserByEmailRepository,
  LoadUsersRepository,
  LoadUserByTokenRepository {

  async create(input: CreateUserModel): Promise<UserModel> {
  
    return User.create({
      data: {
        ...input,
        role: input.role as ROLE
      },
    });
  }

  async loadByEmail(email: string): Promise<UserModel | null> {
    return User.findUnique({ where: { email } });
  }

  async loadByIdAndRole(id: string, role?: string): Promise<UserModel | null> {

    return User.findUnique({
      where: {
        id,
        role: role as ROLE,
      }
    });
  }

  async loadAll(): Promise<UserModel[]> {
    return User.findMany()
  }
}
