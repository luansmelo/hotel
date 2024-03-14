import {
  FindGroupByIdContract,
  GroupModel,
  UpdateGroup,
  UpdateGroupContract,
} from "@/contracts/group";
import { CreateGroupModel } from "@/entities/group/createGroup";

export class UpdateGroupUseCase implements UpdateGroup {
  constructor(
    private readonly updateGroup: UpdateGroupContract,
    private readonly findGroup: FindGroupByIdContract
  ) { }

  async updateById(
    id: string,
    input: Partial<CreateGroupModel>
  ): Promise<Partial<GroupModel | null>> {
    const group = await this.findGroup.findById(id);

    if (!group) {
      return null;
    }

    return this.updateGroup.updateById(group.id, { name: input.name });;
  }
}
