import { LoadInputsRepository } from "@/data/protocols/db/input/LoadInputsRepository.protocol";
import { FindInputsParams, FindInputsResponse } from "@/domain/usecases/input/FindInputsParams";
import { LoadInputsUseCaseContract } from "@/domain/usecases/input/LoadInputs";

export class FindInputsUseCase implements LoadInputsUseCaseContract {
  constructor(private readonly findInputs: LoadInputsRepository) {}

  async loadAll(params: FindInputsParams): Promise<FindInputsResponse | null> {
    return await this.findInputs.loadAll(params);
  }
}
