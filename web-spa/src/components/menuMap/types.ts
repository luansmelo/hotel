import { CategoryProps, ProductOnCategory } from '@/utils/interfaces/category'
import { MenuCreateProps, MenuToCategoryProps } from '@/utils/interfaces/menu'
import { Dispatch, SetStateAction } from 'react'
import { DATE_TABS } from '../dateTabs'
import { Menu } from '@/app/(authenticated)/kitchen/menu/page'

export interface MenuMapProps {
  loading: boolean
  isOpenModel: boolean
  menuList?: MenuCreateProps[]
  categoryList?: CategoryProps[]
  handleSave?: (input: MenuCreateProps) => Promise<void>
  handleProductAddCategory?: (input: ProductOnCategory) => Promise<void>
  handleCategoryToMenu?: (input: MenuToCategoryProps) => Promise<void>
  closeModal: () => void
}

export interface AddProductToCategoryProps {
  day: string
  setCurrentDateTab: Dispatch<SetStateAction<DATE_TABS | undefined>>
  isOpenModel: boolean
  menuProductList: Menu
  closeModal: () => void

  handleProductAddCategory: (input: ProductOnCategory) => Promise<void>
}
