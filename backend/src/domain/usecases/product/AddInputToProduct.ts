export interface InputToProduct {
  id: string;
  measurement: string;
  grammage: number;
}

export interface InputAddProduct {
  id: string;
  measurement: string;
  grammage: number;
}

export interface AddInputToProductModel {
  productId: string;
  ingredients: InputAddProduct[];
}

export interface AddInputToProductUseCaseContract {
  addProduct(input: AddInputToProductModel): Promise<Partial<{ count: number }>>;
}
