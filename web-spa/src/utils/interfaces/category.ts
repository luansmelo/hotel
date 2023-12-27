import { Product } from '@/components/product/types'

export interface ProductWeekDay {
  productId: string
  weekDay: string
}

export interface CategoryProps {
  id?: string
  name: string
  schedule?: Product[]
}

export interface ProductOnCategory {
  menuId: string
  categoryId: string
  product: ProductWeekDay[]
}
