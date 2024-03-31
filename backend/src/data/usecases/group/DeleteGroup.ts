import { DeleteGroupRepository } from "@/data/protocols/db/group/DeleteGroupRepository.protocol.ts";
import { LoadGroupByIdRepository } from "@/data/protocols/db/group/LoadGroupByIdRepository.protocol";
import { GroupModel } from "@/domain/models/Group";
import { DeleteGroupUseCaseContract } from "@/domain/usecases/group/DeleteGroup";

export class DeleteGroupUseCase implements DeleteGroupUseCaseContract {
  constructor(
    private readonly deleteGroup: DeleteGroupRepository,
    private readonly findGroup: LoadGroupByIdRepository
  ) { }

  async deleteById(id: string): Promise<GroupModel> {
    const group = await this.findGroup.loadById(id);

    if (!group) {
      return null
    }

    return this.deleteGroup.deleteById(group.id);
  }
}
