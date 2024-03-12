import { RemoveProductModel } from "@/entities/menu/RemoveProductToMenuEntity";

export interface RemoveProductToMenuContract {
  add(input: RemoveProductModel): Promise<void>;
}

export interface RemoveProductToMenu {
  addInput(input: RemoveProductModel): Promise<void>;
}
