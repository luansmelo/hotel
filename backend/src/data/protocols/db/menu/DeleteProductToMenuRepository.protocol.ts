import { RemoveProductModel } from "@/domain/usecases/menu/DeleteProductToMenu";

export interface DeleteProductToMenuRepository {
    deleteProduct(input: RemoveProductModel): Promise<void>;
  }