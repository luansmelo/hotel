import { FindGroupsContract, GroupModel } from "@/contracts/group";

export class FindGroupsUseCase {
  constructor(private readonly groups: FindGroupsContract) {}

  async findAll(): Promise<GroupModel[] | null> {
    return this.groups.findAll();
  }
}
