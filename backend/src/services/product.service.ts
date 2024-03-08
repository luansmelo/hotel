import {
  ProductRepositoryContract,
  ProductServiceContract,
} from "@/utils/contracts/products-contract";
import {
  AddInputToProduct,
  ProductModel,
  ProductInputRemove,
} from "@/dto/product/product.dto";
import { NotFoundError, UnauthorizedError } from "@/utils/errors/httpErrors";
import { uuid } from "uuidv4";
import { File } from "@/storage/s3/file";

export class ProductService implements ProductServiceContract {
  constructor(private readonly repository: ProductRepositoryContract) {}

  async create(input: ProductModel) {
    const product = await this.getByName(input.name);

    if (product) throw new NotFoundError("Produto já cadastrado");

    const data = {
      name: input.name,
      description: input.description,
      preparationTime: input.preparationTime,
      resource: input.resource,
    };

    return this.repository.save(data);
  }

  async getById(id: string): Promise<any> {
    const product = await this.repository.getById(id);

    if (!product) throw new NotFoundError("Produto não encontrado");

    return product;
  }

  async getByName(name: string): Promise<any> {
    return this.repository.getByName(name);
  }

  async getAll(): Promise<any> {
    const predefinedProducts = await this.repository.getAll();

    const processedProducts = predefinedProducts.map((predefinedProduct) => ({
      id: predefinedProduct.id,
      name: predefinedProduct.name,
      description: predefinedProduct.description,
      inputs: predefinedProduct.inputs.map((input) => ({
        id: input.input.id,
        grammage: input.grammage,
        measurementUnit: input.measurementUnit,
        ...input.input,
      })),
    }));

    return processedProducts;
  }

  async getPredefinedProduct(id: string) {
    await this.getById(id);

    const predefinedProduct = await this.repository.getPredefinedProduct(id);

    if (!predefinedProduct) throw new NotFoundError("Produto não encontrado");

    const processedProduct = {
      id: predefinedProduct.id,
      name: predefinedProduct.name,
      description: predefinedProduct.description,
      inputs: predefinedProduct.inputs.map((input) => ({
        id: input.input.id,
        grammage: input.grammage,
        measurementUnit: input.measurementUnit,
        ...input.input,
      })),
    };

    return processedProduct;
  }

  async deleteById(id: string): Promise<void> {
    await this.getById(id);

    return this.repository.deleteById(id);
  }

  async addInputToProduct(input: AddInputToProduct): Promise<void> {
    const product = await this.getPredefinedProduct(input.productId);

    const inputIdsToAdd = input.input.map((i) => i.id);
    const inputOnProduct = product.inputs.some((productInput) =>
      inputIdsToAdd.includes(productInput.id)
    );

    if (inputOnProduct)
      throw new UnauthorizedError("Input já foi adicionado ao produto");

    const data = {
      id: uuid(),
      ...input,
    };

    return this.repository.addInputToProduct(data);
  }

  async updateById(id: string, param: Partial<ProductModel>): Promise<void> {
    await this.getById(id);
    return this.repository.updateById(id, param);
  }

  async removeInputFromProduct(input: ProductInputRemove): Promise<void> {
    await this.getById(input.productId);

    return this.repository.removeInputFromProduct(input);
  }

  async updateProductPhoto(
    id: string,
    file: File
  ): Promise<Partial<ProductModel>> {
    console.log(id, file);
    throw new Error("Method not implemented.");
  }
}
