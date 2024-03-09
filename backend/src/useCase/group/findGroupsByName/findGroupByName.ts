import { FindGroupByNameContract, GroupModel } from "@/contracts/group";

export class FindGroupByNameUseCase {
  constructor(private readonly findGroup: FindGroupByNameContract) {}

  async findByName(name: string): Promise<GroupModel> {
    return this.findGroup.findByName(name);
  }
}
