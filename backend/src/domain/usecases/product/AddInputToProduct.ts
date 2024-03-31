export interface InputToProduct {
  id: string;
  measurementUnit: string;
  grammage: number;
}

export interface AddInputToProductModel {
  id: string;
  inputs: InputToProduct[];
}

export interface AddInputToProductUseCaseContract {
  addProduct(input: AddInputToProductModel): Promise<Partial<{ count: number }>>;
}
