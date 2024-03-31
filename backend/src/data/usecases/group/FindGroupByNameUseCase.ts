import {
  FindGroupByName,
  FindGroupByNameContract,
} from "@/contracts/group";
import { GroupModel } from "@/domain/models/Group";

export class FindGroupByNameUseCase implements FindGroupByName {
  constructor(private readonly findGroup: FindGroupByNameContract) {}

  async findByName(name: string): Promise<GroupModel> {
    return this.findGroup.findByName(name);
  }
}
