import { CreateProductRepository } from "@/data/protocols/db/product/CreateProductRepository.protocol";
import { LoadProductByNameRepository } from "@/data/protocols/db/product/LoadProductByNameRepository.protocol";
import { ProductModel } from "@/domain/models/Product";
import { CreateProductModel, CreateProductUseCaseContract } from "@/domain/usecases/product/CreateProduct";
import { ProductAlreadyExistsError } from "@/presentation/errors/ProductAlreadyExistsError";

export class CreateProductUseCase implements CreateProductUseCaseContract {
  constructor(
    private readonly createProduct: CreateProductRepository,
    private readonly findProduct: LoadProductByNameRepository
  ) { }

  async create(productModel: CreateProductModel): Promise<ProductModel> {

    const product = await this.findProduct.loadByName(productModel.name);

    if (product) {
      throw new ProductAlreadyExistsError("Produto já cadastrado");
    }

    return this.createProduct.create(productModel);
  }
}
