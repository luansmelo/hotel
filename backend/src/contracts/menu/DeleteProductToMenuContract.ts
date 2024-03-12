import { RemoveProductModel } from "@/entities/menu/RemoveProductToMenuEntity";

export interface DeleteProductToMenuContract {
  deleteProduct(input: RemoveProductModel): Promise<void>;
}

export interface DeleteProductToMenu {
  deleteProduct(input: RemoveProductModel): Promise<void>;
}
