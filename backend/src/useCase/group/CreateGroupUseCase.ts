import {
  CreateGroup,
  CreateGroupContract,
  FindGroupByNameContract,
  GroupModel,
} from "@/contracts/group";
import { CreateGroupModel } from "@/entities/group/createGroup";
import { GroupAlreadyExistsError } from "@/utils/errors/GroupAlreadyExistsError";

export class CreateGroupUseCase implements CreateGroup {
  constructor(
    private readonly createGroup: CreateGroupContract,
    private readonly findGroup: FindGroupByNameContract
  ) { }

  async create(groupModel: CreateGroupModel): Promise<GroupModel> {
    const group = await this.findGroup.findByName(groupModel.name);

    if (group) {
      throw new GroupAlreadyExistsError();
    }

    return this.createGroup.save(groupModel);
  }
}
