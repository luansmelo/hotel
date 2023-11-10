export interface MenuDTO {
  name: string;
}

export interface AddCategoryToMenuDTO {
  menuId: string;
  categoryId: string;
}

export interface AddProductToMenuDTO {
  menuId: string;
  productId: string;
  day: number;
  category: number;
}

export interface MenuProductDTO {
  menuId: string;
  categoryId: string;
  day: any;
}

export interface MenuProdutionMapDTO {
  menuId: string;
  productId: string;
  day: number;
  category: number;
}
