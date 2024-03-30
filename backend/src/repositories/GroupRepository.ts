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
import Group from "@/models/group";

export class GroupRepository
  implements
  CreateGroupContract,
  DeleteGroupContract,
  FindGroupByIdContract,
  FindGroupByNameContract,
  FindGroupsByIdContract,
  FindGroupsContract,
  UpdateGroupContract {
  
  async save(input: CreateGroupModel): Promise<GroupModel> {
    return Group.create({
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
    const order = findParams.order || "ASC";
    const sort = findParams.sort || "name";

    const groups = await Group.findMany({
      orderBy: [
        {
          [sort]: order,
        },
      ],
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
    return Group.findUnique({ where: { id } });
  }

  async findByIds(ids: string[]): Promise<GroupModel[]> {
    return Group.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findByName(name: string): Promise<GroupModel | null> {
    return Group.findUnique({ where: { name } });
  }

  async deleteById(id: string): Promise<GroupModel> {
    return Group.delete({ where: { id } });
  }

  async updateById(
    id: string,
    input: Partial<CreateGroupModel>
  ): Promise<GroupModel> {
    return Group.update({ where: { id }, data: input });
  }
}
