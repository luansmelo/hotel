import { InputModel } from "@/contracts/input/CreateInputContract";
import {
  FindInputByCode,
  FindInputByCodeContract,
} from "@/contracts/input/FindInputByCodeContract";

export class FindInputByCodeUseCase implements FindInputByCode {
  constructor(private readonly findInput: FindInputByCodeContract) {}

  async findByCode(code: string): Promise<InputModel | null> {
    return this.findInput.findByCode(code);
  }
}
