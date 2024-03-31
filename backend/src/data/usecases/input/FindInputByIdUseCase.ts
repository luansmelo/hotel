import { FindInputById, FindInputByIdContract } from "@/contracts/input";
import { InputModel } from "@/contracts/input/CreateInputContract";

export class FindInputByIdUseCase implements FindInputById {
  constructor(private readonly findInput: FindInputByIdContract) {}

  async findById(id: string): Promise<InputModel | null> {
    return this.findInput.findById(id);
  }
}
