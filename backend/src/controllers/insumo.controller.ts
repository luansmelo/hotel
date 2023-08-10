import { InsumoDTO } from "../dto/insumo.dto";
import { InsumoService } from "../services/insumo.service";

export class InsumoController {
  constructor(private readonly insumoService: InsumoService) {}

  async createInsumo(payload: InsumoDTO) {
    return this.insumoService.createInsumo(payload);
  }

  async getInsumo() {
    return this.insumoService.getInsumos();
  }
}
