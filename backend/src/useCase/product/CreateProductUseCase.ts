import {
  CreateProduct,
  CreateProductContract,
  FindProductByNameContract,
  ProductModel,
} from "@/contracts/product";
import { CreateProductModel } from "@/entities/product/createProduct";
import { BadRequestError, ConflictError } from "@/utils/errors/httpErrors";

export class CreateProductUseCase implements CreateProduct {
  constructor(
    private readonly createProduct: CreateProductContract,
    private readonly findProduct: FindProductByNameContract
  ) {}

  async create(productModel: CreateProductModel): Promise<ProductModel> {
    const preparationTime = productModel.preparationTime || 0;

    if (preparationTime < 0) {
      throw new BadRequestError("O tempo de preparação deve ser maior que 0");
    }

    const resource = productModel.resource || "";

    if (!resource) {
      throw new BadRequestError("O recurso deve ser informado");
    }

    const product = await this.findProduct.findByName(productModel.name);

    if (product) {
      throw new ConflictError("Produto já cadastrado");
    }

    return this.createProduct.save(productModel);
  }
}
