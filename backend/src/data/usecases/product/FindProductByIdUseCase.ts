import { LoadProductByIdRepository } from "@/data/protocols/db/product/LoadProductByIdRepository.protocol";
import { ProductModel } from "@/domain/models/Product";
import { LoadProductByIdUseCaseContract } from "@/domain/usecases/product/LoadProductById";

export class FindProductByIdUseCase implements LoadProductByIdUseCaseContract {
  constructor(private readonly findProduct: LoadProductByIdRepository) { }

  async loadById(id: string): Promise<ProductModel> {
    const product = await this.findProduct.loadById(id);

    return product;
  }
}
