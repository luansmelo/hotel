import { PratoDTO } from "../dto/prato.dto";
import { PratoService } from "../services/prato.service";

export class PratoController {
  constructor(private readonly pratoService: PratoService) {}

  async createDish(payload: PratoDTO) {
    return this.pratoService.createDish(payload);
  }

  async getDishs() {
    return this.pratoService.getDishs();
  }
}
