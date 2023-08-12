import { Knex } from "knex";
import { AddInsumoToDish, PratoDTO } from "../dto/prato.dto";

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

  async getDishByName(nome: string) {
    const [dish] = await this.database(PratoRepository.dish).whereRaw(
      "LOWER(nome) = ?",
      nome.toLowerCase()
    );
    return dish;
  }

  async addInsumoToDish(payload: AddInsumoToDish) {
    await this.database(PratoRepository.dish_insumo).insert({
      dish_id: payload.dishId,
      insumo_id: payload.insumoId,
      quantidade: payload.quantidade,
    });
  }
}
