export interface MenuDTO {
  name: string;
}

export interface AddProductToMenuDTO {
  menuId: string;
  productId: string;
  day: number;
  category: number;
}

export interface MenuProdutionMapDTO {
  menuId: string;
  productId: string;
  day: number;
  category: number;
}
