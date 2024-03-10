import { FindInputs, InputModel } from "@/contracts/input";

export class FindInputsController {
  constructor(private readonly inputs: FindInputs) {}

  async findAll(): Promise<InputModel[] | null> {
    return this.inputs.findAll();
  }
}
