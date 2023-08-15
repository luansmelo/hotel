import { AddInsumoToDish, PratoDTO } from "../dto/prato.dto";
import { PratoService } from "../services/prato.service";

export class PratoController {
  constructor(private readonly pratoService: PratoService) {}

  async createDish(payload: PratoDTO) {
    return this.pratoService.createDish(payload);
  }

  async getDishs() {
    return this.pratoService.getDishs();
  }

  async addInsumoToDish(payload: AddInsumoToDish) {
    return this.pratoService.addInsumoToDish(payload);
  }

  async getDishWithIngredients(dishId: string) {
    return this.pratoService.getDishWithIngredients(dishId);
  }
}
