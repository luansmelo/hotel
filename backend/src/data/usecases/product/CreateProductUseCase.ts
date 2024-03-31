import { CreateProductRepository } from "@/data/protocols/db/product/CreateProductRepository.protocol";
import { LoadProductByNameRepository } from "@/data/protocols/db/product/LoadProductByNameRepository.protocol";
import { ProductModel } from "@/domain/models/Product";
import { CreateProductModel, CreateProductUseCaseContract } from "@/domain/usecases/product/CreateProduct";
import { ProductAlreadyExistsError } from "@/presentation/errors/ProductAlreadyExistsError";
import { ProductReportPreparationTimeError } from "@/presentation/errors/ProductReportPreparationTimeError";
import { ProductReportResourceError } from "@/presentation/errors/ProductReportResourceError";

export class CreateProductUseCase implements CreateProductUseCaseContract {
  constructor(
    private readonly createProduct: CreateProductRepository,
    private readonly findProduct: LoadProductByNameRepository
  ) {}

  async create(productModel: CreateProductModel): Promise<ProductModel> {
    const preparationTime = productModel.preparationTime || 0;

    if (preparationTime < 0) {
      throw new ProductReportPreparationTimeError("O tempo de preparação deve ser maior que 0");
    }

    const resource = productModel.resource || "";

    if (!resource) {
      throw new ProductReportResourceError("O recurso deve ser informado");
    }

    const product = await this.findProduct.loadByName(productModel.name);

    if (product) {
      throw new ProductAlreadyExistsError("Produto já cadastrado");
    }

    return this.createProduct.create(productModel);
  }
}
