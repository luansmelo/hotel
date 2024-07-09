import { LoadInputByIdRepository } from "@/data/protocols/db/input/LoadIngredientByIdRepository.protocol";
import { InputModel } from "@/domain/models/Input";
import { LoadInputByIdUseCaseContract } from "@/domain/usecases/input/LoadInputById";

export class LoadInputByIdUseCase implements LoadInputByIdUseCaseContract {
  constructor(private readonly findInput: LoadInputByIdRepository) {}

  async loadById(id: string): Promise<InputModel | null> {
    return this.findInput.loadById(id);
  }
}
