import { LoadGroupsRepository } from "@/data/protocols/db/group/LoadGroupsRepository.protocol";
import { FindGroupsParams, FindGroupsResponse } from "@/domain/usecases/group/FindGroupsParams";
import { LoadGroupsUseCaseContract } from "@/domain/usecases/group/LoadGroups";

export class FindGroupsUseCase implements LoadGroupsUseCaseContract {
  constructor(private readonly groups: LoadGroupsRepository) {}

  async findAll(params: FindGroupsParams): Promise<FindGroupsResponse | null> {
    return this.groups.loadAll(params);
  }
}
