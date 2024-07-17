import User from "@/data/local/entity/user";
import { ROLE } from "@/config/constants";

import { CreateUserRepository } from "@/data/protocols/db/user/CreateUserRepository.protocol";
import { UserModel } from "@/domain/models/User";
import { LoadUserByEmailRepository } from "@/data/protocols/db/user/LoadUserByEmailRepository.protocol";
import { LoadUsersRepository } from "@/data/protocols/db/user/LoadUsersRepository.protocol";
import { LoadUserByTokenRepository } from "@/data/protocols/db/user/LoadUserByTokenRepository.protocol";
import { CreateUserModel } from "@/domain/usecases/user/CreateUser";
import { UpdateUserRepository } from "@/data/protocols/db/user/UpdateUserRepository.protocol";
import { FindUsersResponse } from "@/domain/usecases/user/FindUsersParams";
import { FindGroupsParams } from "@/domain/usecases/group/FindGroupsParams";
import { LoadUserByIdRepository } from "@/data/protocols/db/user/LoadUserByIdRepository.protocol";
import { DeleteUserRepository } from "@/data/protocols/db/user/DeleteUserRepository.protocol.ts";
import { CountTotalUserRepository } from "@/data/protocols/db/user/CountTotalUserRepository.protocol";

export class UserRepository
  implements CreateUserRepository,
  LoadUserByEmailRepository,
  LoadUsersRepository,
  LoadUserByTokenRepository,
  LoadUserByIdRepository,
  UpdateUserRepository,
  DeleteUserRepository,
  CountTotalUserRepository {

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

  async loadById(id: string): Promise<UserModel | null> {
    return User.findUnique({ where: { id } });
  }

  async loadByIdAndRole(id: string, role?: string): Promise<UserModel | null> {

    return User.findUnique({
      where: {
        id,
        role: role as ROLE,
      }
    });
  }

  async loadAll(findParams: FindGroupsParams): Promise<FindUsersResponse> {
    const page = findParams.page || 1;
    const limit = process.env.PAGE_LIMIT
      ? parseInt(process.env.PAGE_LIMIT)
      : 10;
    const offset = (page - 1) * limit;
    const order = findParams.order || "asc";
    const sort = findParams.sort || "name";

    const users = await User.findMany({
      orderBy:
      {
        [sort]: order,
      },
      take: limit,
      skip: offset,
    });

    const totalItems = users.length;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      users,
      totalPages,
      totalItems,
    };
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

  async deleteById(id: string): Promise<UserModel> {
    return User.delete({ where: { id } })
  }

  async countTotalUsers(): Promise<number> {
    const count = await User.count();
    return count;
  }
}
