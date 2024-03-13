import { FindGroups } from "@/contracts/group";
import {
  FindGroupsParams,
  FindGroupsResponse,
} from "@/entities/group/FindGroupsParams";

export class FindGroupsController {
  constructor(private readonly groups: FindGroups) {}

  async findAll(params: FindGroupsParams): Promise<FindGroupsResponse | null> {
    return this.groups.findAll(params);
  }
}
