import { FindGroups, GroupModel } from "@/contracts/group";

export class FindGroupsController {
  constructor(private readonly groups: FindGroups) {}

  async findAll(): Promise<GroupModel[] | null> {
    return this.groups.findAll();
  }
}
