import { ProductRepositoryContract } from "../utils/contracts/products-contract";
import { AddInputToProductData, ProductContract } from "../dto/product.dto";
import { InputsOnProducts, PrismaClient } from "@prisma/client";

export class ProductRepository implements ProductRepositoryContract {
  constructor(private readonly db: PrismaClient) {}
  async save(input: ProductContract) {
    await this.db.product.create({
      data: input,
    });
  }

  async getById(id: string): Promise<ProductContract | null> {
    const db = await this.db.product.findUnique({ where: { id } });
    return db;
  }

  async getByName(name: string): Promise<ProductContract | null> {
    const db = await this.db.product.findUnique({ where: { name } });
    return db;
  }

  async getAll(): Promise<ProductContract[] | null> {
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
            measurementUnit: true,
            grammage: true,
          },
        },
      },
    });
    return db;
  }

  async updateById(id: string, input: ProductContract) {
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

  async getAllInputsOnProduct(): Promise<InputsOnProducts[]> {
    const db = await this.db.inputsOnProducts.findMany();
    return db;
  }

  async addInputToProduct(input: AddInputToProductData): Promise<void> {
    const existingInputs = await this.db.inputsOnProducts.findMany();

    const inputIdsToUpdate = input.input.map(
      (inputItem) => inputItem.id as string
    );
    const inputIdsToDelete = existingInputs
      .filter((existingInput) => !inputIdsToUpdate.includes(existingInput.id))
      .map((input) => input.id);

    for (const inputItem of input.input) {
      await this.db.inputsOnProducts.upsert({
        where: { id: inputItem.id as string },
        update: {
          name: inputItem.name,
          measurementUnit: inputItem.measurementUnit,
          grammage: inputItem.grammage,
          updated_at: new Date().toISOString(),
        },
        create: {
          id: inputItem.id as string,
          productId: input.productId,
          inputId: inputItem.id as string,
          name: inputItem.name,
          measurementUnit: inputItem.measurementUnit,
          grammage: inputItem.grammage,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      });
    }

    await this.db.inputsOnProducts.deleteMany({
      where: { id: { in: inputIdsToDelete } },
    });
  }
}
