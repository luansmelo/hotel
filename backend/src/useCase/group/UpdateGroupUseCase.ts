import {
  FindGroupByIdContract,
  GroupModel,
  UpdateGroup,
  UpdateGroupContract,
} from "@/contracts/group";
import { CreateGroupModel } from "@/entities/group/createGroup";
import { NotFoundError } from "@/utils/errors/httpErrors";

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
      throw new NotFoundError("Grupo não encontrado");
    }

    return this.updateGroup.updateById(group.id, { name: input.name });
  }
}
