import {
  FindGroupByIdContract,
  GroupModel,
  UpdateGroup,
  UpdateGroupContract,
} from "@/contracts/group";
import { CreateGroupModel } from "@/entities/group/createGroup";
import { GroupNotFoundError } from "@/utils/errors/GroupNotFoundError";

export class UpdateGroupUseCase implements UpdateGroup {
  constructor(
    private readonly updateGroup: UpdateGroupContract,
    private readonly findGroup: FindGroupByIdContract
  ) {}

  async updateById(
    id: string,
    input: Partial<CreateGroupModel>
  ): Promise<GroupModel> {
    const group = await this.findGroup.findById(id);

    if (!group) {
      throw new GroupNotFoundError();
    }

    return this.updateGroup.updateById(group.id, { name: input.name });
  }
}
