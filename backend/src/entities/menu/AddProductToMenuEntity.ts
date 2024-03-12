export interface Product {
  productId: string;
  weekDay: string[];
}

export interface AddProductModel {
  menuId: string;
  categoryId: string;
  product: Product[];
}

export interface AddProductToMenuModel {
  menuId: string;
  categoryId: string;
  productId: string;
  weekDay: string;
}
