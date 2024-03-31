import {
  DeleteInput,
  DeleteInputContract,
  FindInputByIdContract,
} from "@/contracts/input";
import { InputModel } from "@/contracts/input/CreateInputContract";
import { InputNotFoundError } from "@/presentation/errors/InputNotFoundError";

export class DeleteInputUseCase implements DeleteInput {
  constructor(
    private readonly deleteInput: DeleteInputContract,
    private readonly findInput: FindInputByIdContract
  ) {}

  async deleteById(id: string): Promise<InputModel> {
    const input = await this.findInput.findById(id);

    if (!input) {
      throw new InputNotFoundError();
    }

    return this.deleteInput.deleteById(input.id);
  }
}
