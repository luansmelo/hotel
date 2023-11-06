import prisma from "../database";
import { ProductRepositoryContract } from "../contracts/products-contract";
import { AddInputToDish, ProductDTO } from "../dto/product.dto";

export class ProductRepository implements ProductRepositoryContract {
  async save(input: ProductDTO) {
    await prisma.product.create({
      data: input,
    });
  }

  async getById(id: string) {
    const db = await prisma.product.findUnique({ where: { id } });

    return db;
  }

  async getAll() {
    const db = await prisma.input.findMany();

    return db;
  }

  async updateById(id: string, input: ProductDTO) {
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

  async addInputToProduct(input: AddInputToDish): Promise<void> {
    await prisma.input.update({
      where: { id: input.inputId },
      data: {
        products: {
          connect: { id: input.productId },
        },
      },
    });
  }
}
