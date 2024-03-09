import { FindGroupById, GroupModel } from "@/contracts/group";

export class FindGroupByIdController {
  constructor(private readonly group: FindGroupById) {}

  async findById(id: string): Promise<GroupModel | null> {
    return this.group.findById(id);
  }
}
