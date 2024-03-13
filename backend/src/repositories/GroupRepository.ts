import { PrismaClient } from "@prisma/client";

import {
  CreateGroupContract,
  DeleteGroupContract,
  FindGroupByIdContract,
  FindGroupByNameContract,
  FindGroupsContract,
  UpdateGroupContract,
  GroupModel,
} from "@/contracts/group";
import { CreateGroupModel } from "@/entities/group/createGroup";
import { FindGroupsByIdContract } from "@/contracts/group/FindGroupsByIdContract";
import {
  FindGroupsParams,
  FindGroupsResponse,
} from "@/entities/group/FindGroupsParams";

export class GroupRepository
  implements
    CreateGroupContract,
    DeleteGroupContract,
    FindGroupByIdContract,
    FindGroupByNameContract,
    FindGroupsByIdContract,
    FindGroupsContract,
    UpdateGroupContract
{
  constructor(private readonly db: PrismaClient) {}
  async save(input: CreateGroupModel): Promise<GroupModel> {
    return this.db.group.create({
      data: input,
    });
  }

  async findAll(
    findParams: FindGroupsParams
  ): Promise<FindGroupsResponse | null> {
    const page = findParams.page || 1;
    const limit = process.env.PAGE_LIMIT
      ? parseInt(process.env.PAGE_LIMIT)
      : 10;
    const offset = (page - 1) * limit;
    const order = findParams.order || "asc";

    const groups = await this.db.group.findMany({
      orderBy: {
        name: order,
      },
      take: limit,
      skip: offset,
    });

    const totalItems = groups.length;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      groups,
      totalPages,
      totalItems,
    };
  }

  async findById(id: string): Promise<GroupModel | null> {
    return this.db.group.findUnique({ where: { id } });
  }

  async findByIds(ids: string[]): Promise<GroupModel[]> {
    return this.db.group.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findByName(name: string): Promise<GroupModel | null> {
    return this.db.group.findUnique({ where: { name } });
  }

  async deleteById(id: string): Promise<GroupModel> {
    return this.db.group.delete({ where: { id } });
  }

  async updateById(
    id: string,
    input: Partial<CreateGroupModel>
  ): Promise<GroupModel> {
    return this.db.group.update({ where: { id }, data: input });
  }
}
