import { LoadGroupByNameRepository } from "@/data/protocols/db/group/LoadGroupByNameRepository.protocol.ts";
import { GroupModel } from "@/domain/models/Group";
import { LoadGroupByNameUseCaseContract } from "@/domain/usecases/group/LoadGroupByName";

export class LoadGroupByNameUseCase implements LoadGroupByNameUseCaseContract {
  constructor(private readonly findGroup: LoadGroupByNameRepository) {}

  async loadByName(name: string): Promise<GroupModel> {
    return this.findGroup.loadByName(name);
  }
}
