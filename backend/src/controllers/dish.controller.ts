import { AddInputToDish, DishDTO } from "../dto/dish.dto";
import { DishService } from "../services/dish.service";

export class DishController {
  constructor(private readonly pratoService: DishService) {}

  async createDish(payload: DishDTO) {
    return this.pratoService.createDish(payload);
  }

  async getDishs() {
    return this.pratoService.getDishs();
  }

  async AddInputToDish(payload: AddInputToDish) {
    return this.pratoService.addInputToDish(payload);
  }

  async getDishWithIngredients(dishId: string) {
    return this.pratoService.getDishWithIngredients(dishId);
  }
}
