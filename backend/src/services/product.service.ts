import {
  ProductRepositoryContract,
  ProductServiceContract,
} from "../contracts/products-contract";
import { AddInputToDish, ProductDTO } from "../dto/product.dto";

export class ProductService implements ProductServiceContract {
  constructor(private readonly productRepository: ProductRepositoryContract) {}

  async create(input: ProductDTO) {
    return this.productRepository.save(input);
  }

  async getAll() {
    return this.productRepository.getAll();
  }

  async addInputToProduct(input: AddInputToDish): Promise<void> {
    return this.productRepository.addInputToProduct(input);
  }
}
