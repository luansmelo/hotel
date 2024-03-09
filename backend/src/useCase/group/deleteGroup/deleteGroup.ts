import {
  DeleteGroupContract,
  FindGroupByIdContract,
  GroupModel,
} from "@/contracts/group";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class DeleteGroupUseCase {
  constructor(
    private readonly deleteGroup: DeleteGroupContract,
    private readonly findGroup: FindGroupByIdContract
  ) {}

  async deleteById(id: string): Promise<GroupModel> {
    const group = await this.findGroup.findById(id);

    if (!group) {
      throw new NotFoundError("Grupo não encontrado");
    }

    return this.deleteGroup.deleteById(group.id);
  }
}
