export interface Product {
  productId: string;
  weekDay: string[];
}

export interface AddProductModel {
  menuId: string;
  categoryId: string;
  product: Product[];
}

export interface AddProductToMenu {
  addProduct(input: AddProductModel): Promise<Partial<{ count: number }>>;
}
