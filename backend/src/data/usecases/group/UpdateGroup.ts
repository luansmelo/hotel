import { LoadGroupByIdRepository } from "@/data/protocols/db/group/LoadGroupByIdRepository.protocol";
import { LoadGroupByNameRepository } from "@/data/protocols/db/group/LoadGroupByNameRepository.protocol.ts";
import { UpdateGroupRepository } from "@/data/protocols/db/group/UpdateGroupRepository.protocol";
import { GroupModel } from "@/domain/models/Group";
import { UpdateGroupUseCaseContract } from "@/domain/usecases/group/UpdateGroup";
import { CreateGroupModel } from "@/entities/group/createGroup";
import { GroupAlreadyExistsError } from "@/presentation/errors/GroupAlreadyExistsError";

export class UpdateGroupUseCase implements UpdateGroupUseCaseContract {
  constructor(
    private readonly updateGroup: UpdateGroupRepository,
    private readonly findGroup: LoadGroupByIdRepository,
    private readonly findGroupByName: LoadGroupByNameRepository
  ) { }

  async updateById(
    id: string,
    input: Partial<CreateGroupModel>
  ): Promise<Partial<GroupModel | null>> {
    const group = await this.findGroup.loadById(id);

    if (!group) {
      return null;
    }

    if (input.name) {
      const groupExists = await this.findGroupByName.loadByName(input.name);

      if (groupExists) {
        throw new GroupAlreadyExistsError('Nome do grupo já em uso');
      }
    }

    return this.updateGroup.updateById(group.id, { name: input.name });;
  }
}
