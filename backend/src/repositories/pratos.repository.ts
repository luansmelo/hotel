import { Knex } from "knex";
import { PratoDTO } from "../dto/prato.dto";

export class PratoRepository {
  private static dish: string = "dish";

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
}
