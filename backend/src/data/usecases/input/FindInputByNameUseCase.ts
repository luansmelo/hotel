import { LoadInputByNameRepository } from "@/data/protocols/db/input/LoadIngredientByNameRepository.protocol";
import { InputModel } from "@/domain/models/Input";
import { LoadInputByNameUseCaseContract } from "@/domain/usecases/input/LoadInputByName";

export class FindInputByNameUseCase implements LoadInputByNameUseCaseContract {
  constructor(private readonly findInput: LoadInputByNameRepository) {}

  async loadByName(name: string): Promise<InputModel | null> {
    return this.findInput.loadByName(name);
  }
}
