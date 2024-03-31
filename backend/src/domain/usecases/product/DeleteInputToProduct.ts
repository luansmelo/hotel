export interface RemoveInputToProductModel {
    productId: string;
    inputId: string;
}

export interface DeleteInputToProductUseCaseContract {
    deleteProduct(product: RemoveInputToProductModel): Promise<Partial<{ count: number }>>;
}
