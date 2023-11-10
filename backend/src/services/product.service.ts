import {
  ProductRepositoryContract,
  ProductServiceContract,
} from "../contracts/products-contract";
import { AddInputToProductDTO, ProductDTO } from "../dto/product.dto";
import { NotFoundError } from "../errors/httpErrors";

export class ProductService implements ProductServiceContract {
  constructor(private readonly productRepository: ProductRepositoryContract) {}

  async create(input: ProductDTO) {
    const product = await this.getByName(input.name);

    if (product) {
      throw new NotFoundError("Produto já cadastrado");
    }

    return this.productRepository.save(input);
  }

  async getById(id: string): Promise<any> {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }

    return product;
  }

  async getByName(name: string): Promise<any> {
    return this.productRepository.getByName(name);
  }

  async getAll(): Promise<any> {
    return this.productRepository.getAll();
  }

  async getPredefinedProduct(id: string) {
    return this.productRepository.getPredefinedProduct(id);
  }

  deleteById(id: string): Promise<void> {
    return this.productRepository.deleteById(id);
  }

  async addInputToProduct(input: AddInputToProductDTO): Promise<void> {
    return this.productRepository.addInputToProduct(input);
  }
}
