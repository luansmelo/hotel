import { UpdateGroup } from "@/contracts/group";
import { CreateGroupModel } from "@/entities/group/createGroup";

export class UpdateGroupController {
  constructor(private readonly group: UpdateGroup) {}

  async updateById(id: string, input: Partial<CreateGroupModel>) {
    return this.group.updateById(id, input);
  }
}
