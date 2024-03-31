export interface Product {
  productId: string;
  weekDay: string[];
}

export interface AddProductModel {
  menuId: string;
  categoryId: string;
  product: Product[];
}

export interface AddProductToMenuUseCaseContract {
  addProduct(input: AddProductModel): Promise<Partial<{ count: number }>>;
}
