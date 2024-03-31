import {
  FindGroupsParams,
  FindGroupsResponse,
} from "@/entities/group/FindGroupsParams";
import Group from "@/data/local/entity/group";
import { CreateGroupRepository } from "@/data/protocols/db/group/CreateGroupRepository.protocol";
import { GroupModel } from "@/domain/models/Group";
import { CreateGroupModel } from "@/domain/usecases/group/CreateGroup";
import { LoadGroupByNameRepository } from "@/data/protocols/db/group/LoadGroupByNameRepository.protocol.ts";
import { LoadGroupsRepository } from "@/data/protocols/db/group/LoadGroupsRepository.protocol";
import { LoadGroupByIdRepository } from "@/data/protocols/db/group/LoadGroupByIdRepository.protocol";
import { UpdateGroupRepository } from "@/data/protocols/db/group/UpdateGroupRepository.protocol";
import { DeleteGroupRepository } from "@/data/protocols/db/group/DeleteGroupRepository.protocol.ts";
import { LoadGroupsByIdsRepository } from "@/data/protocols/db/group/LoadGroupsByIdsRepository.protocol";

export class GroupRepository
  implements
  CreateGroupRepository,
  DeleteGroupRepository,
  LoadGroupByIdRepository,
  LoadGroupByNameRepository,
  LoadGroupsByIdsRepository,
  LoadGroupsRepository,
  UpdateGroupRepository {

  async create(input: CreateGroupModel): Promise<GroupModel> {
    return Group.create({
      data: input,
    });
  }

  async loadAll(
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

  async loadById(id: string): Promise<GroupModel | null> {
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

  async loadByName(name: string): Promise<GroupModel | null> {
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
