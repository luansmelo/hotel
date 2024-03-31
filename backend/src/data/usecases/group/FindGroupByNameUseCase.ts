import {
  FindGroupByName,
  FindGroupByNameContract,
  GroupModel,
} from "@/contracts/group";

export class FindGroupByNameUseCase implements FindGroupByName {
  constructor(private readonly findGroup: FindGroupByNameContract) {}

  async findByName(name: string): Promise<GroupModel> {
    return this.findGroup.findByName(name);
  }
}
