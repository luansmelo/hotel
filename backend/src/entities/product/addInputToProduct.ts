export interface InputToProduct {
  id: string;
  measurementUnit: string;
  grammage: number;
}

export interface AddInputToProductModel {
  id: string;
  inputs: InputToProduct[];
}
