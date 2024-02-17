import { ProductRepositoryContract } from "../utils/contracts/products-contract";
import {
  AddInputToProductData,
  ProductContract,
  ProductInputRemove,
  UpdatedProductInfo,
} from "../dto/product.dto";
import { PrismaClient } from "@prisma/client";
import { File } from "../utils/s3/file";

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

  async getAll() {
    const db = await this.db.product.findMany({
      include: {
        inputs: {
          select: {
            id: true,
            measurementUnit: true,
            grammage: true,
            input: {
              select: {
                id: true,
                name: true,
                code: true,
                unitPrice: true,
                groups: true,
              },
            },
          },
        },
      },
    });
    return db;
  }

  async getPredefinedProduct(id: string) {
    const db = await this.db.product.findFirst({
      where: { id: id },
      include: {
        inputs: {
          select: {
            id: true,
            measurementUnit: true,
            grammage: true,
            input: {
              select: {
                id: true,
                name: true,
                code: true,
                unitPrice: true,
                groups: true,
              },
            },
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

  async updatePredefinedProduct(id: string, updatedInfo: UpdatedProductInfo) {
    await this.db.product.update({
      where: { id },
      data: {
        name: updatedInfo.name,
        description: updatedInfo.description,
        inputs: {
          updateMany: updatedInfo.inputs.map((input) => ({
            where: { inputId: input.id },
            data: {
              grammage: input.grammage,
              measurementUnit: input.measurementUnit,
            },
          })),
        },
      },
    });
  }

  async deleteById(id: string) {
    await this.db.product.delete({
      where: { id },
    });
  }

  async addInputToProduct(input: AddInputToProductData): Promise<void> {
    const data = input.input.map((inputItem) => ({
      productId: input.productId,
      inputId: inputItem.id as string,
      measurementUnit: inputItem.measurementUnit,
      grammage: inputItem.grammage,
      created_at: input.created_at,
      updated_at: input.updated_at,
    }));
    await this.db.inputsOnProducts.createMany({ data });
  }

  async removeInputFromProduct(input: ProductInputRemove): Promise<void> {
    await this.db.inputsOnProducts.deleteMany({
      where: {
        productId: input.productId,
        inputId: input.inputId,
      },
    });
  }

  async updateProductPhoto(
    id: string,
    file: File
  ): Promise<Partial<ProductContract>> {
    return this.db.product.update({
      where: { id },
      data: {
        photo_url: file.filename,
      },
    });
  }

  async removeProductPhoto(id: string) {
    return this.db.product.update({
      where: { id },
      data: {
        photo_url: null,
      },
    });
  }
}
