import { FindInputs, FindInputsContract } from "@/contracts/input";
import { InputModel } from "@/contracts/input/createInput";

export class FindInputsUseCase implements FindInputs {
  constructor(private readonly findInputs: FindInputsContract) {}

  async findAll(): Promise<InputModel[] | null> {
    return this.findInputs.findAll();
  }
}
