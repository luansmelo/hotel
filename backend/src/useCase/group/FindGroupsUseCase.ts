import { FindGroups, FindGroupsContract } from "@/contracts/group";
import {
  FindGroupsParams,
  FindGroupsResponse,
} from "@/entities/group/FindGroupsParams";

export class FindGroupsUseCase implements FindGroups {
  constructor(private readonly groups: FindGroupsContract) {}

  async findAll(params: FindGroupsParams): Promise<FindGroupsResponse | null> {
    return this.groups.findAll(params);
  }
}
