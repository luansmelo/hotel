import { InputRepositoryContract } from "../utils/contracts/input-contract";
import { InputContract } from "../dto/input.dto";
import { PrismaClient } from "@prisma/client";

export class InputRepository implements InputRepositoryContract {
  constructor(private readonly db: PrismaClient) {}
  async save(input: InputContract) {
    return this.db.input.create({
      data: input,
    });
  }

  async getById(id: string) {
    const db = await this.db.input.findUnique({ where: { id } });

    return db;
  }

  async getByCode(code: string): Promise<any> {
    const db = await this.db.input.findUnique({ where: { code } });

    return db;
  }

  async getAll() {
    const db = await this.db.input.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return db;
  }

  async updateById(id: string, input: InputContract) {
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
