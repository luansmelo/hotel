import { Knex } from "knex";
import { AddInputToDish, DishDTO } from "../dto/dish.dto";

export class DishRepository {
  private static dish: string = "dish";
  private static dish_input: string = "dish_input";
  constructor(private readonly database: Knex<any, unknown[]>) {}

  async createDish(data: DishDTO) {
    await this.database(DishRepository.dish).insert({
      ...data,
    });
  }

  async getDishs() {
    const dish = await this.database(DishRepository.dish);

    return dish;
  }

  async getDishByName(name: string) {
    const [dish] = await this.database(DishRepository.dish).whereRaw(
      "LOWER(name) = ?",
      name.toLowerCase()
    );
    return dish;
  }

  async addInputToDish(payload: AddInputToDish) {
    await this.database(DishRepository.dish_input).insert({
      dish_id: payload.dishId,
      input_id: payload.inputId,
      unit_measurement: payload.unit_measurement,
    });
  }

  async doesInputExistForDish(
    dishId: string,
    inputId: string
  ): Promise<boolean> {
    const [count] = await this.database(DishRepository.dish_input)
      .where("dish_id", dishId)
      .andWhere("input_id", inputId)
      .count("* as total");
    return Number(count.total) > 0;
  }

  async getDishWithIngredientsData(dishId: string) {
    return this.database("dish_input")
      .join("dish", "dish.id", "=", "dish_input.dish_id")
      .join("input", "input.id", "=", "dish_input.input_id")
      .select(
        "dish.id as dishId",
        "dish.name",
        "dish.description",
        "dish.variant",
        "dish.method_preparation",
        "dish.programming",
        "input.id as inputId",
        "input.associative_unit",
        "dish_input.unit_measurement",
        "input.cost_per_unit",
        "input.supplier"
      )
      .where("dish.id", dishId);
  }
}
