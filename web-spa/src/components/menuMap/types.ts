import { ProductOnCategory } from '@/utils/interfaces/category'
import { MenuCreateProps } from '@/utils/interfaces/menu'

export interface MenuMapProps {
  loading: boolean
  isOpenModel: boolean
  handleSave?: (input: MenuCreateProps) => Promise<void>
  handleProductAddCategory?: (input: ProductOnCategory) => Promise<void>
  closeModal: () => void
}

export interface AddProductToCategoryProps {
  day: string
  isOpenModel: boolean
  menuProductList: any
  closeModal: () => void
  handleProductAddCategory: (input: ProductOnCategory) => Promise<void>
}
