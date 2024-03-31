import { CreateGroupRepository } from "@/data/protocols/db/group/CreateGroupRepository.protocol";
import { LoadGroupByNameRepository } from "@/data/protocols/db/group/LoadGroupByNameRepository.protocol.ts";
import { GroupModel } from "@/domain/models/Group";
import { CreateGroupUseCaseContract } from "@/domain/usecases/group/CreateGroup";
import { CreateGroupModel } from "@/domain/usecases/group/group/createGroup";
import { GroupAlreadyExistsError } from "@/presentation/errors/GroupAlreadyExistsError";

export class CreateGroupUseCase implements CreateGroupUseCaseContract {
  constructor(
    private readonly createGroup: CreateGroupRepository,
    private readonly findGroup: LoadGroupByNameRepository
  ) { }

  async create(groupModel: CreateGroupModel): Promise<GroupModel> {
    const group = await this.findGroup.loadByName(groupModel.name);

    if (group) {
      throw new GroupAlreadyExistsError('Grupo ja cadastrado');
    }

    return this.createGroup.create(groupModel);
  }
}
