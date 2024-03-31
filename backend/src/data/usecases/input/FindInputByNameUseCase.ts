import { FindInputByName, FindInputByNameContract } from "@/contracts/input";
import { InputModel } from "@/contracts/input/CreateInputContract";

export class FindInputByNameUseCase implements FindInputByName {
  constructor(private readonly findInput: FindInputByNameContract) {}

  async findByName(name: string): Promise<InputModel | null> {
    return this.findInput.findByName(name);
  }
}
