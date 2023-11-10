export interface MenuDTO {
  name: string;
}

export interface AddCategoryToMenuDTO {
  menuId: string;
  categoryId: string;
  day: number;
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
