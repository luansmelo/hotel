import { Knex } from "knex";
import { uuid } from "uuidv4";
import { PratoDTO } from "../dto/prato.dto";

export class PratoRepository {
  private static prato: string = "pratos";
  constructor(private readonly database: Knex<any, unknown[]>) {}

  async createPrato(data: PratoDTO) {
    await this.database(PratoRepository.prato).insert({
      id: uuid(),
      ...data,
    });
  }
}
