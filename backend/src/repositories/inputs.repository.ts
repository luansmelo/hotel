import { Knex } from "knex";
import { InputDTO } from "../dto/input.dto";

export class InputRepository {
  private static input: string = "input";
  constructor(private readonly database: Knex<any, unknown[]>) {}

  async createInput(data: InputDTO) {
    await this.database(InputRepository.input).insert({
      ...data,
    });
  }

  async getInputs() {
    const insumos = await this.database(InputRepository.input);

    return insumos;
  }

  async getInputByName(name: string) {
    const [insumo] = await this.database(InputRepository.input).whereRaw(
      "LOWER(name) = ?",
      name.toLowerCase()
    );

    return insumo;
  }
}
