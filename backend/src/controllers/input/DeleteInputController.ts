import { DeleteInput } from "@/contracts/input";

export class DeleteInputController {
  constructor(private readonly input: DeleteInput) {}

  async deleteById(id: string) {
    return this.input.deleteById(id);
  }
}
