import { GroupRepositoryContract } from "../utils/contracts/group-contract";
import { NotFoundError } from "../errors/httpErrors";
import { uuid } from "uuidv4";
import { GroupServiceContract } from "../utils/contracts/group-contract";
import { GroupInput } from "../dto/group.dto";

export class GroupService implements GroupServiceContract {
  constructor(private readonly repository: GroupRepositoryContract) {}
  async create(input: GroupInput): Promise<void> {
    const data = {
      id: uuid(),
      name: input.name,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    await this.repository.save(data);
  }
  async getById(id: string): Promise<any> {
    const group = await this.repository.getById(id);

    if (!group) {
      throw new NotFoundError("Grupo não encontrado");
    }

    return group;
  }
  async getAll(): Promise<any> {
    return this.repository.getAll();
  }
  async deleteById(id: string): Promise<void> {
    const group = await this.getById(id);

    await this.repository.deleteById(group.id);
  }
}
