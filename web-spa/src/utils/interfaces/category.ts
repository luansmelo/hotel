export interface CategoryProps {
  categoryId?: string
  name: string
}

export interface ProductOnCategory {
  categoryId: string
  productId: string
  weekDay: string
}
