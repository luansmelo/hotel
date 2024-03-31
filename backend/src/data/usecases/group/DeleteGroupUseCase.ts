import {
  DeleteGroup,
  DeleteGroupContract,
  FindGroupByIdContract,
} from "@/contracts/group";
import { GroupModel } from "@/domain/models/Group";

export class DeleteGroupUseCase implements DeleteGroup {
  constructor(
    private readonly deleteGroup: DeleteGroupContract,
    private readonly findGroup: FindGroupByIdContract
  ) { }

  async deleteById(id: string): Promise<GroupModel> {
    const group = await this.findGroup.findById(id);

    if (!group) {
      return null
    }

    return this.deleteGroup.deleteById(group.id);
  }
}
