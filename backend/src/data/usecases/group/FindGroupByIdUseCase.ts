import {
  FindGroupById,
  FindGroupByIdContract,
} from "@/contracts/group";
import { GroupModel } from "@/domain/models/Group";

export class FindGroupByIdUseCase implements FindGroupById {
  constructor(private readonly findGroup: FindGroupByIdContract) {}

  async findById(id: string): Promise<GroupModel> {
    return this.findGroup.findById(id);
  }
}
