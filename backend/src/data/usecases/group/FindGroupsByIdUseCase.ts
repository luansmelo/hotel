import { FindGroupsById } from "@/contracts/group/FindGroupsByIdContract";
import { GroupModel } from "@/domain/models/Group";

export class FindGroupsByIdUseCase implements FindGroupsById {
  constructor(private readonly findGroup: FindGroupsById) {}

  async findByIds(ids: string[]): Promise<GroupModel[]> {
    return this.findGroup.findByIds(ids);
  }
}
