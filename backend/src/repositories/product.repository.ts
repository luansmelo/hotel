import prisma from "../database";
import { ProductRepositoryContract } from "../contracts/products-contract";
import { AddInputToProductDTO, ProductDTO } from "../dto/product.dto";

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

  async getPredefinedProduct(id: string) {
    const db = await prisma.product.findUnique({
      where: { id },
      include: { inputs: { include: { input: true } } },
    });

    return {
      ...db,
      inputs: db?.inputs?.map((input) => input.input),
    };
  }

  async updateById(id: string, input: ProductDTO) {
    await prisma.product.update({
      where: { id },
      data: input,
    });
  }

  async deleteById(id: string) {
    await prisma.product.delete({
      where: { id },
    });
  }

  async addInputToProduct(input: AddInputToProductDTO): Promise<void> {
    await prisma.inputsOnProducts.create({
      data: {
        ...input,
      },
    });
  }
}
