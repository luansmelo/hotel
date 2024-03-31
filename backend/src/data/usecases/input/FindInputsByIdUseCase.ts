import {
  FindInputsById,
  FindInputsByIdContract,
} from "@/contracts/input/FindInputsByIdContract";
import { InputModel } from "@/contracts/input/CreateInputContract";

export class FindInputsByIdUseCase implements FindInputsById {
  constructor(private readonly findInput: FindInputsByIdContract) {}

  async findByIds(ids: string[]): Promise<InputModel[] | null> {
    return this.findInput.findByIds(ids);
  }
}
