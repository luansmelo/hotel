import { InputServiceContract } from "@/utils/contracts/input-contract";
import { InputRegister } from "@/dto/input/input.dto";

export class InputController {
  constructor(private readonly service: InputServiceContract) {}

  async create(input: InputRegister) {
    return this.service.create(input);
  }

  async getAll() {
    return this.service.getAll();
  }

  async updateById(id: string, input: InputRegister) {
    return this.service.updateById(id, input);
  }

  async deleteById(id: string) {
    return this.service.deleteById(id);
  }
}
