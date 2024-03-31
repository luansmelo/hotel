export interface RemoveProductModel {
    id?: string;
    menuId: string;
    categoryId: string;
    productId: string;
    weekDay: string;
}

export interface DeleteProductToMenuUseCaseContract {
    deleteProduct(product: RemoveProductModel): Promise<void>;
}
