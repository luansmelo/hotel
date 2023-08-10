import { Knex } from "knex";
import { InsumoDTO } from "../dto/insumo.dto";
import { uuid } from "uuidv4";

export class InsumoRepository {
  private insumo: string = "insumos";
  constructor(private readonly database: Knex<any, unknown[]>) {}

  async handle(data: InsumoDTO) {
    await this.database(this.insumo).insert({ id: uuid(), ...data });
  }

  async getInsumos() {
    return this.database(this.insumo).select("*");
  }

  async getInsumoByName(nome: string) {
    const [insumo] = await this.database(this.insumo)
      .select("nome")
      .where({ nome });

    return insumo;
  }
}
