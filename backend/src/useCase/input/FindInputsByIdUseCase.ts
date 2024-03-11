import {
  FindInputsById,
  FindInputsByIdContract,
} from "@/contracts/input/FindInputsById";
import { InputModel } from "@/contracts/input/createInput";

export class FindInputsByIdUseCase implements FindInputsById {
  constructor(private readonly findInput: FindInputsByIdContract) {}

  async findByIds(ids: string[]): Promise<InputModel[] | null> {
    return this.findInput.findByIds(ids);
  }
}
