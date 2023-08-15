import { InputDTO } from "../dto/input.dto";
import { InputService } from "../services/input.service";

export class InputController {
  constructor(private readonly inputService: InputService) {}

  async createInput(payload: InputDTO) {
    return this.inputService.createInput(payload);
  }

  async getInputs() {
    return this.inputService.getInputs();
  }
}
