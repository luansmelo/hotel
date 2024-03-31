import User from "@/data/local/entity/user";
import { ROLE } from "@/config/constants";

import { CreateUserRepository } from "@/data/protocols/db/user/CreateUserRepository.protocol";
import { UserModel } from "@/domain/models/User";
import { LoadUserByEmailRepository } from "@/data/protocols/db/user/LoadUserByEmailRepository.protocol";
import { LoadUsersRepository } from "@/data/protocols/db/user/LoadUsersRepository.protocol";
import { LoadUserByTokenRepository } from "@/data/protocols/db/user/LoadUserByTokenRepository.protocol";
import { CreateUserModel } from "@/domain/usecases/user/CreateUser";
import { UpdateUserRepository } from "@/data/protocols/db/user/UpdateUserRepository.protocol";

export class UserRepository
  implements CreateUserRepository,
  LoadUserByEmailRepository,
  LoadUsersRepository,
  LoadUserByTokenRepository,
  UpdateUserRepository {

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

  async updateById(id: string, data: Partial<CreateUserModel>): Promise<Partial<UserModel>> {
    return User.update({
      where: { id },
      data: {
        ...data,
        role: data.role as ROLE
      }
    })
  }
}
