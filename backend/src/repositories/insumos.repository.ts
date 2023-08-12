import { Knex } from "knex";
import { InputDTO } from "../dto/insumo.dto";

export class InsumoRepository {
  private static input: string = "input";
  constructor(private readonly database: Knex<any, unknown[]>) {}

  async createInput(data: InputDTO) {
    await this.database(InsumoRepository.input).insert({
      ...data,
    });
  }

  async getInputs() {
    const insumos = await this.database(InsumoRepository.input);

    return insumos;
  }

  async getInputByName(nome: string) {
    const [insumo] = await this.database(InsumoRepository.input).whereRaw(
      "LOWER(nome) = ?",
      nome.toLowerCase()
    );

    return insumo;
  }
}
