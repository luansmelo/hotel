import prisma from "../database";
import { InputRepositoryContract } from "../contracts/input-contract";
import { InputDTO } from "../dto/input.dto";

export class InputRepository implements InputRepositoryContract {
  async save(input: InputDTO) {
    return prisma.input.create({
      data: input,
    });
  }

  async getById(id: string) {
    const db = await prisma.input.findUnique({ where: { id } });

    return db;
  }

  async getAll() {
    const db = await prisma.input.findMany();

    return db;
  }

  async updateById(id: string, input: InputDTO) {
    await prisma.input.update({
      where: { id },
      data: input,
    });
  }

  async deleteById(id: string) {
    await prisma.input.delete({
      where: { id },
    });
  }
}
