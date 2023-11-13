import { ProductRepositoryContract } from "../utils/contracts/products-contract";
import {
  AddInputToProductData,
  ProductRegister,
  ProductData,
} from "../dto/product.dto";
import { PrismaClient } from "@prisma/client";

export class ProductRepository implements ProductRepositoryContract {
  constructor(private readonly db: PrismaClient) {}
  async save(input: ProductData) {
    await this.db.product.create({
      data: input,
    });
  }

  async getById(id: string) {
    const db = await this.db.product.findUnique({ where: { id } });
    return db;
  }

  async getByName(name: string) {
    const db = await this.db.product.findUnique({ where: { name } });
    return db;
  }

  async getAll() {
    const db = await this.db.product.findMany();
    return db;
  }

  async getPredefinedProduct(id: string) {
    const db = await this.db.product.findFirst({
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

  async updateById(id: string, input: ProductRegister) {
    await this.db.product.update({
      where: { id },
      data: input,
    });
  }

  async deleteById(id: string) {
    await this.db.product.delete({
      where: { id },
    });
  }

  async addInputToProduct(input: AddInputToProductData): Promise<void> {
    const inputData = input.input.map((inputItem) => ({
      id: inputItem.id,
      productId: input.productId,
      inputId: inputItem.id as string,
      name: inputItem.name,
      code: inputItem.code,
      unitPrice: inputItem.unitPrice,
      measurementUnit: inputItem.measurementUnit,
      group: inputItem.group,
      grammage: inputItem.grammage,
      created_at: inputItem.created_at,
      updated_at: inputItem.updated_at,
    }));

    await this.db.inputsOnProducts.createMany({
      data: inputData,
    });
  }
}
