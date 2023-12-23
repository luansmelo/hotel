import {
  ProductRepositoryContract,
  ProductServiceContract,
} from "../utils/contracts/products-contract";
import {
  AddInputToProduct,
  AddInputToProductData,
  ProductInput,
  UpdatedProductInfo,
} from "../dto/product.dto";
import { NotFoundError, UnauthorizedError } from "../errors/httpErrors";
import { uuid } from "uuidv4";

export class ProductService implements ProductServiceContract {
  constructor(private readonly repository: ProductRepositoryContract) {}

  async create(input: ProductInput) {
    const product = await this.getByName(input.name);

    if (product) {
      throw new NotFoundError("Produto já cadastrado");
    }

    const data = {
      id: uuid(),
      name: input.name,
      description: input.description,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    return this.repository.save(data);
  }

  async getById(id: string): Promise<any> {
    const product = await this.repository.getById(id);

    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }

    return product;
  }

  async getByName(name: string): Promise<any> {
    return this.repository.getByName(name);
  }

  async getAll(): Promise<any> {
    return this.repository.getAll();
  }

  async getPredefinedProduct(id: string) {
    await this.getById(id);

    return this.repository.getPredefinedProduct(id);
  }

  async deleteById(id: string): Promise<void> {
    await this.getById(id);

    return this.repository.deleteById(id);
  }

  async addInputToProduct(input: AddInputToProduct): Promise<void> {
    const product = await this.getPredefinedProduct(input.productId);

    const inputIdsToAdd = input.input.map((i) => i.id);
    const inputOnProduct = product.inputs.some((productInput) =>
      inputIdsToAdd.includes(productInput.input.id)
    );

    if (inputOnProduct) {
      throw new UnauthorizedError("Input já foi adicionado ao produto");
    }

    const data = {
      id: uuid(),
      ...input,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    return this.repository.addInputToProduct(data);
  }

  async updatePredefinedProduct(
    id: string,
    updatedInfo: UpdatedProductInfo
  ): Promise<void> {
    await this.getById(id);

    return this.repository.updatePredefinedProduct(id, updatedInfo);
  }

  async removeInputFromProduct(input: AddInputToProductData): Promise<void> {
    await this.getById(input.productId);

    return this.repository.removeInputFromProduct(input);
  }
}
