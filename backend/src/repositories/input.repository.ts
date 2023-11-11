import { InputRepositoryContract } from "../contracts/input-contract";
import { InputDTO } from "../dto/input.dto";
import { PrismaClient } from "@prisma/client";

export class InputRepository implements InputRepositoryContract {
  constructor(private readonly db: PrismaClient) {}
  async save(input: InputDTO) {
    return this.db.input.create({
      data: input,
    });
  }

  async getById(id: string) {
    const db = await this.db.input.findUnique({ where: { id } });

    return db;
  }

  async getAll() {
    const db = await this.db.input.findMany();

    return db;
  }

  async updateById(id: string, input: InputDTO) {
    await this.db.input.update({
      where: { id },
      data: input,
    });
  }

  async deleteById(id: string) {
    await this.db.input.delete({
      where: { id },
    });
  }
}
