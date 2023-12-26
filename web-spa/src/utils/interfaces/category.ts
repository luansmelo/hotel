export interface CategoryProps {
  id?: string
  name: string
}

export interface ProductOnCategory {
  categoryId: string
  productId: string
  weekDay: string
}
