import { LoadProductByNameRepository } from "@/data/protocols/db/product/LoadProductByNameRepository.protocol";
import { ProductModel } from "@/domain/models/Product";
import { LoadProductByNameUseCaseContract } from "@/domain/usecases/product/LoadProductByName";

export class FindProductByNameUseCase implements LoadProductByNameUseCaseContract {
  constructor(private readonly findProduct: LoadProductByNameRepository) {}

  async loadById(id: string): Promise<ProductModel> {
    const product = await this.findProduct.loadByName(id);

    return product;
  }
}
