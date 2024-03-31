import {

  FindGroupByNameContract,
} from "@/contracts/group";
import { CreateGroupRepository } from "@/data/protocols/db/group/CreateGroupRepository.protocol";
import { GroupModel } from "@/domain/models/Group";
import { CreateGroup } from "@/domain/usecases/group/CreateGroup";
import { CreateGroupModel } from "@/entities/group/createGroup";
import { GroupAlreadyExistsError } from "@/presentation/errors/GroupAlreadyExistsError";

export class CreateGroupUseCase implements CreateGroup {
  constructor(
    private readonly createGroup: CreateGroupRepository,
    private readonly findGroup: FindGroupByNameContract
  ) { }

  async create(groupModel: CreateGroupModel): Promise<GroupModel> {
    const group = await this.findGroup.findByName(groupModel.name);

    if (group) {
      throw new GroupAlreadyExistsError('Grupo ja cadastrado');
    }

    return this.createGroup.create(groupModel);
  }
}
