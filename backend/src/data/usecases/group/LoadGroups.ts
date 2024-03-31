import { LoadGroupsRepository } from "@/data/protocols/db/group/LoadGroupsRepository.protocol";
import { LoadGroupsUseCaseContract } from "@/domain/usecases/group/LoadGroups";
import {
  FindGroupsParams,
  FindGroupsResponse,
} from "@/entities/group/FindGroupsParams";

export class FindGroupsUseCase implements LoadGroupsUseCaseContract {
  constructor(private readonly groups: LoadGroupsRepository) {}

  async findAll(params: FindGroupsParams): Promise<FindGroupsResponse | null> {
    return this.groups.loadAll(params);
  }
}
