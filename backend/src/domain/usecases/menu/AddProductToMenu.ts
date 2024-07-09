export interface Product {
  productId: string;
  weekDays: string[];
}

export interface AddProductModel {
  menuId: string;
  categoryId: string;
  products: Product[];
}

export interface AddProductToMenuUseCaseContract {
  addProduct(input: AddProductModel): Promise<Partial<{ count: number }>>;
}
