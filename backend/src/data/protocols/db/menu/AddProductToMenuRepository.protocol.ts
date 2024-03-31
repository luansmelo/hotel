export interface AddProductToMenuModel {
  menuId: string;
  categoryId: string;
  productId: string;
  weekDay: string;
}

export interface AddProductToMenuRepository {
  addProduct(input: AddProductToMenuModel[]): Promise<Partial<{ count: number }>>
}