import { InputToProduct } from "./addInputToProduct";
import { CreateProductModel } from "./createProduct";

export interface UpdateProductModel extends Partial<CreateProductModel> {
  inputs: InputToProduct[];
}
