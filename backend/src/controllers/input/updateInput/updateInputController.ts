import { UpdateInput } from "@/contracts/input";
import { CreateInputModel } from "@/entities/input/createInput";

export class UpdateInputController {
  constructor(private readonly updateInput: UpdateInput) {}

  async updateById(id: string, input: Partial<CreateInputModel>) {
    return this.updateInput.updateById(id, input);
  }
}
