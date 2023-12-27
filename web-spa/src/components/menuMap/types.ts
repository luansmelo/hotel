import { CategoryProps, ProductOnCategory } from '@/utils/interfaces/category'
import { MenuCreateProps, MenuProps } from '@/utils/interfaces/menu'

export interface MenuMapProps {
  loading: boolean
  isOpenModel: boolean
  handleSave?: (input: MenuCreateProps) => Promise<void>
  handleProductAddCategory?: (input: ProductOnCategory) => Promise<void>
  closeModal: () => void
}

export interface AddProductToCategoryProps {
  day: string
  menuList: MenuProps[]
  categoryList: CategoryProps[]
  isOpenModel: boolean
  menuProductList: any
  closeModal: () => void
  handleProductAddCategory: (input: ProductOnCategory) => Promise<void>
}
