import { DeleteInputRepository } from "@/data/protocols/db/input/DeleteInputRepository.protocol";
import { LoadInputByIdRepository } from "@/data/protocols/db/input/LoadInputByIdRepository.protocol";
import { InputModel } from "@/domain/models/Input";
import { DeleteInputUseCaseContract } from "@/domain/usecases/input/DeleteInput";
import { InputNotFoundError } from "@/presentation/errors/InputNotFoundError";

export class DeleteInputUseCase implements DeleteInputUseCaseContract {
  constructor(
    private readonly deleteInput: DeleteInputRepository,
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
