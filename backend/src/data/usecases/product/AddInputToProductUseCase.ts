import { AddInputToProductRepository } from "@/data/protocols/db/product/AddInputToProductRepository.protocol";
import { LoadPredefinedProductRepository } from "@/data/protocols/db/product/LoadPredefinedProductRepository.protocol";
import { UpdateProductRepository } from "@/data/protocols/db/product/UpdateProductRepository.protocol";
import { AddInputToProductModel, AddInputToProductUseCaseContract } from "@/domain/usecases/product/AddInputToProduct";
import { InputAlreadyExistsError } from "@/presentation/errors/InputAlreadyExistsError";
import { ProductNotFoundError } from "@/presentation/errors/ProductNotFoundError";

export class AddInputToProductUseCase implements AddInputToProductUseCaseContract {
  constructor(
    private readonly input: AddInputToProductRepository,
    private readonly findProduct: LoadPredefinedProductRepository,
    private readonly updateProduct: UpdateProductRepository
  ) { }

  async addProduct(productModel: AddInputToProductModel): Promise<Partial<{ count: number }>> {
    const product = await this.findProduct.loadPredefinedProduct(productModel.productId);

    if (!product) {
      throw new ProductNotFoundError();
    }

    console.log("lista que chega", productModel.inputs)

    //    const existingInputIds = new Set(product.inputs.map((input) => input.id));
    //  const uniqueInputs = productModel.inputs.filter(
    //  (input) => !existingInputIds.has(input.id)
    //);

    //console.log("Lista única", uniqueInputs)

    //if (!uniqueInputs.length) {
    // throw new InputAlreadyExistsError(
    //  "Todos os insumos já estão inclusos no produto"
    //  );
    //}

    const addInput = await this.input.addInput(productModel);

    console.log("COUNT", addInput.count)

    await this.updateProduct.updateById(productModel.productId, { status: "COMPLETE" })

    return addInput
  }
}
