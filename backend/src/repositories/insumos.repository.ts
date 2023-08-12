import { Knex } from "knex";
import { InputDTO } from "../dto/insumo.dto";

export class InsumoRepository {
  private static insumo: string = "insumos";
  constructor(private readonly database: Knex<any, unknown[]>) {}

  async createInput(data: InputDTO) {
    await this.database(InsumoRepository.insumo).insert({
      ...data,
    });
  }

  async getInputs() {
    const insumos = await this.database(InsumoRepository.insumo);

    return insumos;
  }

  async getInputByName(nome: string) {
    const [insumo] = await this.database(InsumoRepository.insumo).whereRaw(
      "LOWER(nome) = ?",
      nome.toLowerCase()
    );

    return insumo;
  }
}
