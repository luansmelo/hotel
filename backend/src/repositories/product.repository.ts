import { ProductRepositoryContract } from "@/utils/contracts/products-contract";
import {
  AddInputToProductData,
  ProductModel,
  ProductInputRemove,
} from "@/dto/product/product.dto";
import { PrismaClient } from "@prisma/client";
import { File } from "@/storage/s3/file";
import { CreateProductContract } from "@/contracts/product";

export class ProductRepository implements CreateProductContract {
  constructor(private readonly db: PrismaClient) {}

  async save(input: ProductModel) {
    return this.db.product.create({
      data: {
        ...input,
        inputs: null,
      },
    });
  }

  async getById(id: string): Promise<ProductModel | null> {
    const db = await this.db.product.findUnique({ where: { id } });
    return db;
  }

  async getByName(name: string): Promise<ProductModel | null> {
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

  async updateById(id: string, input: Partial<ProductModel>) {
    await this.db.product.update({
      where: { id },
      data: {
        ...input,
        inputs: {
          updateMany:
            input.inputs.map((input) => ({
              where: { inputId: input.id },
              data: {
                grammage: input.grammage,
                measurementUnit: input.measurementUnit,
              },
            })) || [],
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
  ): Promise<Partial<ProductModel>> {
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
