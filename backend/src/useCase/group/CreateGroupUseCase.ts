import {
  CreateGroup,
  CreateGroupContract,
  FindGroupByNameContract,
  GroupModel,
} from "@/contracts/group";
import { CreateGroupModel } from "@/entities/group/createGroup";
import { ConflictError } from "@/utils/errors/httpErrors";

export class CreateGroupUseCase implements CreateGroup {
  constructor(
    private readonly createGroup: CreateGroupContract,
    private readonly findGroup: FindGroupByNameContract
  ) {}

  async create(groupModel: CreateGroupModel): Promise<GroupModel> {
    const group = await this.findGroup.findByName(groupModel.name);

    if (group) {
      throw new ConflictError("Grupo já cadastrado");
    }

    return this.createGroup.save(groupModel);
  }
}
