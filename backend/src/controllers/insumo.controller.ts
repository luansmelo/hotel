import { InputDTO } from "../dto/insumo.dto";
import { InputService } from "../services/insumo.service";

export class InputController {
  constructor(private readonly insumoService: InputService) {}

  async createInput(payload: InputDTO) {
    return this.insumoService.createInput(payload);
  }

  async getInputs() {
    return this.insumoService.getInputs();
  }
}
