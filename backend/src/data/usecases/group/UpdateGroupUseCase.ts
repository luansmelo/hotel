import {
  FindGroupByIdContract,
  FindGroupByNameContract,
  GroupModel,
  UpdateGroup,
  UpdateGroupContract,
} from "@/contracts/group";
import { CreateGroupModel } from "@/entities/group/createGroup";
import { GroupAlreadyExistsError } from "@/utils/errors/GroupAlreadyExistsError";

export class UpdateGroupUseCase implements UpdateGroup {
  constructor(
    private readonly updateGroup: UpdateGroupContract,
    private readonly findGroup: FindGroupByIdContract,
    private readonly findGroupByName: FindGroupByNameContract
  ) { }

  async updateById(
    id: string,
    input: Partial<CreateGroupModel>
  ): Promise<Partial<GroupModel | null>> {
    const group = await this.findGroup.findById(id);

    if (!group) {
      return null;
    }

    if (input.name) {
      const groupExists = await this.findGroupByName.findByName(input.name);

      if (groupExists) {
        throw new GroupAlreadyExistsError('Nome do grupo já em uso');
      }
    }

    return this.updateGroup.updateById(group.id, { name: input.name });;
  }
}
