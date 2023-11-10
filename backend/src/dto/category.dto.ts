export interface CategoryDTO {
  name: string;
}

export interface ProductToCategoryDTO {
  id?: string;
  categoryId: string;
  productId: string;
  weekDay: string;
}
