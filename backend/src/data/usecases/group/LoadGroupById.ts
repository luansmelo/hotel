import { LoadGroupByIdRepository } from "@/data/protocols/db/group/LoadGroupByIdRepository.protocol";
import { GroupModel } from "@/domain/models/Group";
import { LoadGroupByIdUseCaseContract } from "@/domain/usecases/group/LoadGroupById";

export class LoadGroupByIdUseCase implements LoadGroupByIdUseCaseContract {
  constructor(private readonly findGroup: LoadGroupByIdRepository) {}

  async loadById(id: string): Promise<GroupModel> {
    return this.findGroup.loadById(id);
  }
}
