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

export class GroupRepository
  implements
    CreateGroupContract,
    DeleteGroupContract,
    FindGroupByIdContract,
    FindGroupByNameContract,
    FindGroupsContract,
    UpdateGroupContract
{
  constructor(private readonly db: PrismaClient) {}
  async save(input: CreateGroupModel): Promise<GroupModel> {
    return this.db.group.create({
      data: input,
    });
  }

  async findAll(): Promise<GroupModel[] | null> {
    return this.db.group.findMany();
  }

  async findById(id: string): Promise<GroupModel | null> {
    return this.db.group.findUnique({ where: { id } });
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
