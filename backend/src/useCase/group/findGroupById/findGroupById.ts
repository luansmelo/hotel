import { FindGroupByIdContract, GroupModel } from "@/contracts/group";

export class FindGroupByIdUseCase {
  constructor(private readonly findGroup: FindGroupByIdContract) {}

  async findById(id: string): Promise<GroupModel> {
    return this.findGroup.findById(id);
  }
}
