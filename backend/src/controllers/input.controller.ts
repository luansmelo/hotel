import { InputServiceContract } from "../utils/contracts/input-contract";
import { InputRegister } from "../dto/input.dto";

export class InputController {
  constructor(private readonly inputService: InputServiceContract) {}

  async create(input: InputRegister) {
    return this.inputService.create(input);
  }

  async getAll() {
    return this.inputService.getAll();
  }

  async updateById(id: string, input: InputRegister) {
    return this.inputService.updateById(id, input);
  }

  async deleteById(id: string) {
    return this.inputService.deleteById(id);
  }
}
