import { DeleteIngredientRepository } from "@/data/protocols/db/input/DeleteIngredientRepository.protocol";
import { LoadInputByIdRepository } from "@/data/protocols/db/input/LoadIngredientByIdRepository.protocol";
import { InputModel } from "@/domain/models/Input";
import { DeleteInputUseCaseContract } from "@/domain/usecases/input/DeleteInput";
import { InputNotFoundError } from "@/presentation/errors/InputNotFoundError";

export class DeleteInputUseCase implements DeleteInputUseCaseContract {
  constructor(
    private readonly deleteInput: DeleteIngredientRepository,
    private readonly findInput: LoadInputByIdRepository
  ) {}

  async deleteById(id: string): Promise<InputModel> {
    const input = await this.findInput.loadById(id);

    if (!input) {
      throw new InputNotFoundError();
    }

    return this.deleteInput.deleteById(input.id);
  }
}
