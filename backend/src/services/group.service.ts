import { GroupRepositoryContract } from "@/utils/contracts/group-contract";
import { NotFoundError } from "@/utils/errors/httpErrors";
import { GroupServiceContract } from "@/utils/contracts/group-contract";
import { GroupInput } from "@/dto/group/group.dto";

export class GroupService implements GroupServiceContract {
  constructor(private readonly repository: GroupRepositoryContract) {}

  async create(input: GroupInput): Promise<void> {
    await this.repository.save(input);
  }
  async getById(id: string): Promise<any> {
    const group = await this.repository.getById(id);

    if (!group) throw new NotFoundError("Grupo não encontrado");
    return group;
  }

  async getAll(): Promise<any> {
    return this.repository.getAll();
  }

  async deleteById(id: string): Promise<GroupInput> {
    const group = await this.getById(id);

    return this.repository.deleteById(group.id);
  }

  async updateById(id: string, input: GroupInput): Promise<GroupInput> {
    await this.getById(id);

    return this.repository.updateById(id, input);
  }
}
