import { MeasureModel } from "@/domain/models/Measure";

export interface InputToProduct {
  id: string;
  measurementUnit: MeasureModel;
  grammage: number;
}

export interface InputAddProduct {
  id: string;
  measurementUnit: string;
  grammage: number;
}

export interface AddInputToProductModel {
  productId: string;
  inputs: InputAddProduct[];
}

export interface AddInputToProductUseCaseContract {
  addProduct(input: AddInputToProductModel): Promise<Partial<{ count: number }>>;
}
