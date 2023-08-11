import { Knex } from "knex";
import { PratoDTO } from "../dto/prato.dto";

export class PratoRepository {
  private static dish: string = "dish";
  private static dish_insumo: string = "dish_insumo";
  constructor(private readonly database: Knex<any, unknown[]>) {}

  async createDish(data: PratoDTO) {
    await this.database(PratoRepository.dish).insert({
      ...data,
    });
  }

  async getDishs() {
    const dish = await this.database(PratoRepository.dish);

    return dish;
  }

  async getDishByDescription(description: string) {
    const [dish] = await this.database(PratoRepository.dish).whereRaw(
      "LOWER(description) = ?",
      description.toLowerCase()
    );
    return dish;
  }

  async addInsumoToDish(dishId: string, insumoId: string, quantidade: number) {
    await this.database(PratoRepository.dish_insumo).insert({
      dish_id: dishId,
      insumo_id: insumoId,
      quantidade: quantidade,
    });
  }
}
