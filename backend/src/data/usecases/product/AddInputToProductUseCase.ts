import { AddInputToProductRepository } from "@/data/protocols/db/product/AddInputToProductRepository.protocol";
import { LoadPredefinedProductRepository } from "@/data/protocols/db/product/LoadPredefinedProductRepository.protocol";
import { AddInputToProductModel, AddInputToProductUseCaseContract } from "@/domain/usecases/product/AddInputToProduct";
import { InputAlreadyExistsError } from "@/presentation/errors/InputAlreadyExistsError";
import { ProductNotFoundError } from "@/presentation/errors/ProductNotFoundError";

export class AddInputToProductUseCase implements AddInputToProductUseCaseContract {
  constructor(
    private readonly input: AddInputToProductRepository,
    private readonly findProduct: LoadPredefinedProductRepository
  ) { }

  async addProduct(productModel: AddInputToProductModel): Promise<Partial<{ count: number }>> {
    const product = await this.findProduct.loadPredefinedProduct(productModel.id);

    if (!product) {
      throw new ProductNotFoundError();
    }

    const existingInputIds = new Set(product.inputs.map((input) => input.id));
    const uniqueInputs = productModel.inputs.filter(
      (input) => !existingInputIds.has(input.id)
    );

    if (!uniqueInputs.length) {
      throw new InputAlreadyExistsError(
        "Todos os insumos já estão inclusos no produto"
      );
    }

    return this.input.addInput({
      id: productModel.id,
      inputs: uniqueInputs,
    });
  }
}
