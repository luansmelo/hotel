import {
  FindGroupById,
  FindGroupByIdContract,
  GroupModel,
} from "@/contracts/group";

export class FindGroupByIdUseCase implements FindGroupById {
  constructor(private readonly findGroup: FindGroupByIdContract) {}

  async findById(id: string): Promise<GroupModel> {
    return this.findGroup.findById(id);
  }
}
