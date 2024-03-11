import { CreateGroup } from "@/contracts/group";
import { CreateGroupModel } from "@/entities/group/createGroup";

export class CreateGroupController {
  constructor(private readonly group: CreateGroup) {}

  async create(input: CreateGroupModel) {
    return this.group.create(input);
  }
}
