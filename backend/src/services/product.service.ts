import {
  ProductRepositoryContract,
  ProductServiceContract,
} from "../utils/contracts/products-contract";
import { AddInputToProduct, ProductRegister } from "../dto/product.dto";
import { NotFoundError } from "../errors/httpErrors";
import { uuid } from "uuidv4";

export class ProductService implements ProductServiceContract {
  constructor(private readonly repository: ProductRepositoryContract) {}

  async create(input: ProductRegister) {
    const product = await this.getByName(input.name);

    if (product) {
      throw new NotFoundError("Produto já cadastrado");
    }

    const payload = {
      id: uuid(),
      name: input.name,
      description: input.description,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    return this.repository.save(payload);
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
    return this.repository.getPredefinedProduct(id);
  }

  deleteById(id: string): Promise<void> {
    return this.repository.deleteById(id);
  }

  async addInputToProduct(input: AddInputToProduct): Promise<void> {
    const payload = {
      id: uuid(),
      ...input,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    return this.repository.addInputToProduct(payload);
  }
}
