import {
  FindInputByIdContract,
  UpdateInput,
  UpdateInputContract,
  InputModel,
} from "@/contracts/input";

import { CreateInputModel } from "@/entities/input/createInput";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class UpdateInputUseCase implements UpdateInput {
  constructor(
    private readonly updateInput: UpdateInputContract,
    private readonly findInput: FindInputByIdContract
  ) {}

  async updateById(
    id: string,
    param: Partial<CreateInputModel>
  ): Promise<void> {
    const input = await this.findInput.findById(id);

    if (!input) {
      throw new NotFoundError("Insumo não encontrado");
    }

    await this.updateInput.updateById(input.id, param);
  }
}
