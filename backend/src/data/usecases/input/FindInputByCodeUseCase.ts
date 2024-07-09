import { LoadInputByCodeRepository } from "@/data/protocols/db/input/LoadIngredientByCodeRepository.protocol";
import { InputModel } from "@/domain/models/Input";
import { LoadInputByCodeUseCaseContract } from "@/domain/usecases/input/LoadInputByCode";

export class FindInputByCodeUseCase implements LoadInputByCodeUseCaseContract {
  constructor(private readonly findInput: LoadInputByCodeRepository) {}

  async loadByCode(code: string): Promise<InputModel | null> {
    return this.findInput.loadByCode(code);
  }
}
