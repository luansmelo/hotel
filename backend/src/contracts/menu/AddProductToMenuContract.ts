import { AddProductModel } from "@/entities/menu/AddProductToMenuEntity";

export interface AddProductToMenuContract {
  add(input: AddProductModel): Promise<void>;
}

export interface AddProductToMenu {
  addInput(input: AddProductModel[]): Promise<void>;
}
