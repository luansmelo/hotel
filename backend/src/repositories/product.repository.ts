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

  async getByName(name: string) {
    const db = await prisma.product.findUnique({ where: { name } });

    return db;
  }

  async getAll() {
    const db = await prisma.product.findMany();

    return db;
  }

  async getPredefinedProduct(id: string) {
    const db = await prisma.product.findFirst({
      where: { id: id },
      include: {
        inputs: {
          select: {
            id: true,
            name: true,
            code: true,
            unitPrice: true,
            measurementUnit: true,
            group: true,
            grammage: true,
          },
        },
      },
    });

    return db;
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
    const inputData = input.input.map((inputItem) => ({
      productId: input.productId,
      inputId: inputItem.id as string,
      name: inputItem.name,
      code: inputItem.code,
      unitPrice: inputItem.unitPrice,
      measurementUnit: inputItem.measurementUnit,
      group: inputItem.group,
      grammage: inputItem.grammage,
    }));

    await prisma.inputsOnProducts.createMany({
      data: inputData,
    });
  }
}