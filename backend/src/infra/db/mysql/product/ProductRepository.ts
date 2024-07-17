import { mapperProduct } from "@/data/usecases/product/mapper/mapperProduct";
import { CreateProductRepository } from "@/data/protocols/db/product/CreateProductRepository.protocol";
import { CreateProductModel } from "@/domain/usecases/product/CreateProduct";
import { ProductModel, Status } from "@/domain/models/Product";
import { Product, InputOnProducts, ProductMedia } from "@/data/local/entity/product";
import { AddInputToProductRepository } from "@/data/protocols/db/product/AddInputToProductRepository.protocol";
import { LoadProductByIdRepository } from "@/data/protocols/db/product/LoadProductByIdRepository.protocol";
import { LoadProductByNameRepository } from "@/data/protocols/db/product/LoadProductByNameRepository.protocol";
import { LoadProductsRepository } from "@/data/protocols/db/product/LoadProductsRepository.protocol";
import { LoadPredefinedProductRepository } from "@/data/protocols/db/product/LoadPredefinedProductRepository.protocol";
import { DeleteInputToProductRepository } from "@/data/protocols/db/product/DeleteInputToProductRepository.protocol";
import { AddInputToProductModel } from "@/domain/usecases/product/AddInputToProduct";
import { RemoveInputToProductModel } from "@/domain/usecases/product/DeleteInputToProduct";
import { UpdateProductModel } from "@/domain/usecases/product/UpdateProduct";
import { DeleteProductRepository } from "@/data/protocols/db/product/DeleteProductRepository.protocol";
import { FindProductsParams, FindProductsResponse } from "@/domain/usecases/product/FindProductsParams";
import { UploadProductPhotoRepository } from "@/data/protocols/db/productMedia/UploadProductPhotoRepository.protocol";
import { File } from "@/domain/usecases/file/File";

export class ProductRepository
  implements
  CreateProductRepository,
  AddInputToProductRepository,
  LoadProductByIdRepository,
  LoadProductByNameRepository,
  LoadProductsRepository,
  LoadPredefinedProductRepository,
  DeleteProductRepository,
  DeleteInputToProductRepository,
  UploadProductPhotoRepository {

  async create(input: CreateProductModel) {
    return Product.create({
      data: {
        ...input,
        status: 'INCOMPLETE'
      },
    });
  }

  async loadById(id: string): Promise<ProductModel | null> {
    const product = await Product.findUnique({
      where: { id },
      include: {
        ingredients: {
          select: {
            id: true,
            grammage: true,
            ingredient: {
              select: {
                name: true,
                groups: {
                  select: {
                    group: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
                unitPrice: true,
                measurement: true,
                code: true,
              },
            },
          },
        },
      },
    });

    if (!product) return null;

    return mapperProduct(product);
  }

  async loadByName(name: string): Promise<ProductModel | null> {
    const db = await Product.findUnique({ where: { name } });
    return db;
  }

  async loadAll(findParams: FindProductsParams): Promise<FindProductsResponse> {

    const page = findParams.page || 1;
    const limit = process.env.PAGE_LIMIT
      ? parseInt(process.env.PAGE_LIMIT)
      : 10;
    const offset = (page - 1) * limit;
    const order = findParams.order || "asc";
    const sort = findParams.sort || "name";

    const product = await Product.findMany({
      orderBy: {
        [sort]: order,
      },
      include: {
        ingredients: {
          select: {
            id: true,
            grammage: true,
            ingredient: {
              select: {
                id: true,
                name: true,
                groups: {
                  select: {
                    group: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
                unitPrice: true,
                measurement: true,
                code: true,
              },
            },
          },
        },
      },
      take: limit,
      skip: offset,
    });

    if (!product) return null;

    const totalItems = product.length;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      products: product.map((product) => mapperProduct(product)),
      totalItems,
      totalPages
    }
  }

  async loadPredefinedProduct(id: string): Promise<ProductModel | null> {
    const product = await Product.findFirst({
      where: { id },
      include: {
        ingredients: {
          select: {
            id: true,
            grammage: true,
            measurement: true,
            ingredient: {
              select: {
                id: true,
                name: true,
                groups: {
                  select: {
                    group: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
                unitPrice: true,
                measurement: true,
                code: true,
              },
            },
          },
        },
      },
    });

    if (!product) return null;

    return mapperProduct(product);
  }

  async updateById(id: string, input: Partial<UpdateProductModel>) {
    return Product.update({
      where: { id },
      data: {
        ...input,
        status: Status[input.status],
        ingredients: {
          updateMany: input?.ingredients?.map((inputUpdated) => ({
            where: { id: inputUpdated.id },
            data: {
              grammage: inputUpdated.grammage,
              measurement: inputUpdated.measurement
            },
          })) || [],
        }
      }
    });
  }

  async deleteById(id: string) {
    return Product.delete({
      where: { id },
    });
  }

  async addInput(input: AddInputToProductModel): Promise<Partial<{ count: number }>> {

    const data = input.ingredients.map((inputItem) => ({
      productId: input.productId,
      ingredientId: inputItem.id as string,
      measurement: inputItem.measurement,
      grammage: inputItem.grammage,
    }));

    return InputOnProducts.createMany({ data });
  }

  async deleteProduct(
    input: RemoveInputToProductModel
  ): Promise<Partial<{ count: number }>> {
    return InputOnProducts.deleteMany({
      where: {
        id: input.ingredientId,
      },
    });
  }

  async uploadProductPhoto(productId: string, file: File): Promise<Partial<ProductModel> | null> {
    return await Product.update({
      where: { id: productId },
      data: {
        photo_url: file.filename
      }
    })
  }

  async deleteProductPhoto(productId: string): Promise<Partial<ProductModel> | null> { 
    return await Product.update({
      where: { id: productId },
      data: {
        photo_url: null
      }
    })
  }
}
