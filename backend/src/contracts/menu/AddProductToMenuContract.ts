import {
  AddProductModel,
  AddProductToMenuModel,
} from "@/entities/menu/AddProductToMenuEntity";

export interface AddProductToMenuContract {
  add(input: AddProductToMenuModel[]): Promise<Partial<{ count: number }>>;
}

export interface AddProductToMenu {
  addProduct(input: AddProductModel): Promise<Partial<{ count: number }>>;
}
