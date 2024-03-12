import {
  AddProductModel,
  AddProductToMenuModel,
} from "@/entities/menu/AddProductToMenuEntity";

export interface AddProductToMenuContract {
  add(input: AddProductToMenuModel[]): Promise<void>;
}

export interface AddProductToMenu {
  addProduct(input: AddProductModel): Promise<void>;
}
