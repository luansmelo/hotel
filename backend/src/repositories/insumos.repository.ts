import { Knex } from "knex";
import { InsumoDTO } from "../dto/insumo.dto";
import { uuid } from "uuidv4";

export class InsumoRepository {
  private static insumo: string = "insumos";
  constructor(private readonly database: Knex<any, unknown[]>) {}

  async createInsumo(data: InsumoDTO) {
    await this.database(InsumoRepository.insumo).insert({
      id: uuid(),
      ...data,
    });
  }

  async getInsumos() {
    const insumos = await this.database(InsumoRepository.insumo);

    return insumos;
  }

  async getInsumoByName(nome: string) {
    const [insumo] = await this.database(InsumoRepository.insumo)
      .select("nome")
      .where({ nome });

    return insumo;
  }
}
