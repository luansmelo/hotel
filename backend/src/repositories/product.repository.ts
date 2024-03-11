import { PrismaClient } from "@prisma/client";
import { File } from "@/storage/s3/file";
import {
  AddInputToProductContract,
  CreateProductContract,
  DeleteInputToProductContract,
  DeleteProductContract,
  FindProductByIdContract,
  FindProductByNameContract,
  FindProductsContract,
  ProductModel,
  UpdateProductContract,
} from "@/contracts/product";
import { CreateProductModel } from "@/entities/product/createProduct";
import { FindPredefinedProductByIdContract } from "@/contracts/product/findPredefinedProductById";
import { AddInputToProductModel } from "@/entities/product/addInputToProduct";
import { RemoveInputToProductModel } from "@/entities/product/removeInputToProduct";
import { UpdateProductModel } from "@/entities/product/updateProduct";
import { FindInputsByIdContract } from "@/contracts/input/FindInputsById";

export class ProductRepository
  implements
    CreateProductContract,
    AddInputToProductContract,
    FindProductByIdContract,
    FindProductByNameContract,
    FindProductsContract,
    FindPredefinedProductByIdContract,
    DeleteProductContract,
    DeleteInputToProductContract,
    UpdateProductContract
{
  constructor(private readonly db: PrismaClient) {}

  async save(input: CreateProductModel) {
    return this.db.product.create({
      data: {
        ...input,
      },
    });
  }

  async findById(id: string): Promise<ProductModel | null> {
    const db = await this.db.product.findUnique({
      where: { id },
      include: {
        inputs: {
          select: {
            id: true,
            measurementUnit: true,
            grammage: true,
            input: {
              select: {
                name: true,
                groups: true,
                measurementUnit: true,
                unitPrice: true,
              },
            },
          },
        },
      },
    });

    return db as unknown as ProductModel;
  }

  async findByName(name: string): Promise<ProductModel | null> {
    const db = await this.db.product.findUnique({ where: { name } });
    return db;
  }

  async findAll() {
    const db = await this.db.product.findMany();
    return db;
  }

  async findPredefinedById(id: string): Promise<ProductModel | null> {
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
                measurementUnit: true,
                unitPrice: true,
                groups: true,
              },
            },
          },
        },
      },
    });

    if (!db) return null;

    return db as unknown as ProductModel;
  }

  async updateById(id: string, input: Partial<UpdateProductModel>) {
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
    return this.db.product.delete({
      where: { id },
    });
  }

  async add(input: AddInputToProductModel): Promise<void> {
    const data = input.inputs.map((inputItem) => ({
      productId: input.id,
      inputId: inputItem.id as string,
      measurementUnit: inputItem.measurementUnit,
      grammage: inputItem.grammage,
    }));

    await this.db.inputsOnProducts.createMany({ data });
  }

  async deleteInputToProductById(
    input: RemoveInputToProductModel
  ): Promise<void> {
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
