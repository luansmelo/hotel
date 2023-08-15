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
      unidade_de_medida: payload.unidade_de_medida,
    });
  }

  async doesInsumoExistForDish(
    dishId: string,
    insumoId: string
  ): Promise<boolean> {
    const [count] = await this.database(PratoRepository.dish_insumo)
      .where("dish_id", dishId)
      .andWhere("insumo_id", insumoId)
      .count("* as total");
    return Number(count.total) > 0;
  }

  async getDishWithIngredientsData(dishId: string) {
    return this.database("dish_insumo")
      .join("dish", "dish.id", "=", "dish_insumo.dish_id")
      .join("input", "input.id", "=", "dish_insumo.insumo_id")
      .select(
        "dish.id as dishId",
        "dish.nome",
        "dish.description",
        "dish.variante",
        "dish.modo_de_preparo",
        "dish.programacao",
        "input.id as insumoId",
        "input.unidade_associativa",
        "dish_insumo.unidade_de_medida",
        "input.custo_por_unidade",
        "input.fornecedor"
      )
      .where("dish.id", dishId);
  }
}
