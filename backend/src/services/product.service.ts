import {
  ProductRepositoryContract,
  ProductServiceContract,
} from "../contracts/products-contract";
import { AddInputToDish, ProductDTO } from "../dto/product.dto";
import { NotFoundError } from "../errors/httpErrors";

export class ProductService implements ProductServiceContract {
  constructor(private readonly productRepository: ProductRepositoryContract) {}

  async create(input: ProductDTO) {
    return this.productRepository.save(input);
  }

  async getAll() {
    return this.productRepository.getAll();
  }

  async getById(id: string): Promise<any> {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    return product;
  }

  deleteById(id: string): Promise<void> {
    return this.productRepository.deleteById(id);
  }

  async addInputToProduct(input: AddInputToDish): Promise<void> {
    return this.productRepository.addInputToProduct(input);
  }
}
