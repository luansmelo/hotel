import { CreateInput } from "@/contracts/input";
import { CreateInputModel } from "@/entities/input/createInput";

export class CreateInputController {
  constructor(private readonly input: CreateInput) {}

  async create(input: CreateInputModel) {
    return this.input.create(input);
  }
}
