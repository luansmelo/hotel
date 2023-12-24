import { CategoryProps, ProductOnCategory } from '@/utils/interfaces/category'
import { MenuProps } from '@/utils/interfaces/menu'

export interface MenuMapProps {
  loading: boolean
  handleSave?: (input: MenuProps) => Promise<void>
  handleProductAddCategory?: (input: ProductOnCategory) => Promise<void>
  closeModal: () => void
  isOpenModel: boolean
}

export interface AddProductToCategoryProps {
  isOpenModel: boolean
  day: string
  categoryList: CategoryProps
  closeModal: () => void
  handleProductAddCategory: (input: ProductOnCategory) => Promise<void>
}
