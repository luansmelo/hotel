import { PrismaClient } from "@prisma/client";
import { GroupContract, GroupInput } from "@/dto/group/group.dto";
import { GroupRepositoryContract } from "@/utils/contracts/group-contract";

export class GroupRepository implements GroupRepositoryContract {
  constructor(private readonly db: PrismaClient) {}
  async save(input: GroupContract) {
    await this.db.group.create({
      data: input,
    });
  }

  async getAll(): Promise<any> {
    return this.db.group.findMany();
  }

  async getById(id: string): Promise<any> {
    return this.db.group.findUnique({ where: { id } });
  }

  async deleteById(id: string): Promise<GroupInput> {
    return this.db.group.delete({ where: { id } });
  }

  async updateById(id: string, input: GroupInput): Promise<GroupInput> {
    return this.db.group.update({ where: { id }, data: input });
  }
}
