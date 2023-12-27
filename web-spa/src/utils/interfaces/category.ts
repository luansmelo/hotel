import { Product } from '@/components/product/types'

export interface CategoryProps {
  id?: string
  name: string
  schedule?: Product[]
}

export interface ProductOnCategory {
  menuId: string
  categoryId: string
  productId: string
  weekDay: string
}
