import { GroupInput } from "../dto/group.dto";
import { GroupServiceContract } from "../utils/contracts/group-contract";

export class GroupController {
  constructor(private readonly service: GroupServiceContract) {}

  async create(input: GroupInput) {
    return this.service.create(input);
  }

  async getAll() {
    return this.service.getAll();
  }

  async getById(id: string) {
    return this.service.getById(id);
  }
}