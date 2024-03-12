import { GroupModel } from "@/contracts/group";
import { FindGroupsById } from "@/contracts/group/FindGroupsByIdContract";

export class FindGroupsByIdUseCase implements FindGroupsById {
  constructor(private readonly findGroup: FindGroupsById) {}

  async findByIds(ids: string[]): Promise<GroupModel[]> {
    return this.findGroup.findByIds(ids);
  }
}
