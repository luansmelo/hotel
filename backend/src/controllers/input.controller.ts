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
}
