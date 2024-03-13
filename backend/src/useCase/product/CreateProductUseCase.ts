import {
  CreateProduct,
  CreateProductContract,
  FindProductByNameContract,
  ProductModel,
} from "@/contracts/product";
import { CreateProductModel } from "@/entities/product/createProduct";
import { ProductAlreadyExistsError } from "@/utils/errors/ProductAlreadyExistsError";
import { ProductReportPreparationTimeError } from "@/utils/errors/ProductReportPreparationTimeError";
import { ProductReportResourceError } from "@/utils/errors/ProductReportResourceError";

export class CreateProductUseCase implements CreateProduct {
  constructor(
    private readonly createProduct: CreateProductContract,
    private readonly findProduct: FindProductByNameContract
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

    const product = await this.findProduct.findByName(productModel.name);

    if (product) {
      throw new ProductAlreadyExistsError("Produto já cadastrado");
    }

    return this.createProduct.save(productModel);
  }
}
