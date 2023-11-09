import { InputServiceContract } from "../contracts/input-contract";
import { InputDTO } from "../dto/input.dto";

export class InputController {
  constructor(private readonly inputService: InputServiceContract) {}

  async create(input: InputDTO) {
    return this.inputService.create(input);
  }

  async getAll() {
    return this.inputService.getAll();
  }

  async updateById(id: string, input: InputDTO) {
    return this.inputService.updateById(id, input);
  }

  async deleteById(id: string) {
    return this.inputService.deleteById(id);
  }
}
