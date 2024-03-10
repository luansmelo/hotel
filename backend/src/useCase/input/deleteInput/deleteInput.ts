import {
  CategoryModel,
  DeleteCategoryContract,
  FindCategoryByIdContract,
} from "@/contracts";
import {
  DeleteInput,
  DeleteInputContract,
  FindInputByIdContract,
} from "@/contracts/input";
import { InputModel } from "@/contracts/input/createInput";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class DeleteInputUseCase implements DeleteInput {
  constructor(
    private readonly deleteInput: DeleteInputContract,
    private readonly findInput: FindInputByIdContract
  ) {}

  async deleteById(id: string): Promise<InputModel> {
    const input = await this.findInput.findById(id);

    if (!input) {
      throw new NotFoundError("Insumo não encontrado");
    }

    return this.deleteInput.deleteById(input.id);
  }
}
