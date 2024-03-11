import { FindInputById, InputModel } from "@/contracts/input";

export class FindInputByIdController {
  constructor(private readonly input: FindInputById) {}

  async findById(id: string): Promise<InputModel | null> {
    return this.input.findById(id);
  }
}
