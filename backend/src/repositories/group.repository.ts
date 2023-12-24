import { PrismaClient } from "@prisma/client";
import { GroupContract } from "../dto/group.dto";
import { GroupRepositoryContract } from "../utils/contracts/group-contract";

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
  async deleteById(id: string): Promise<void> {
    await this.db.group.delete({ where: { id } });
  }
}
