import { FindGroups, FindGroupsContract, GroupModel } from "@/contracts/group";

export class FindGroupsUseCase implements FindGroups {
  constructor(private readonly groups: FindGroupsContract) {}

  async findAll(): Promise<GroupModel[] | null> {
    return this.groups.findAll();
  }
}
