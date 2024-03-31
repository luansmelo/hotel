import { GroupModel } from "@/domain/models/Group";
import { LoadGroupsByIdsRepository } from "@/data/protocols/db/group/LoadGroupsByIdsRepository.protocol";
import { LoadGroupsByIdsUseCaseContract } from "@/domain/usecases/group/LoadGroupsByIds";

export class LoadGroupsByIdUseCase implements LoadGroupsByIdsUseCaseContract {
  constructor(private readonly findGroup: LoadGroupsByIdsRepository) {}

  async findByIds(ids: string[]): Promise<GroupModel[]> {
    return this.findGroup.findByIds(ids);
  }
}
