export interface RemoveInputToProductModel {
    productId: string;
    ingredientId: string;
}

export interface DeleteInputToProductUseCaseContract {
    deleteProduct(product: RemoveInputToProductModel): Promise<Partial<{ count: number }>>;
}
