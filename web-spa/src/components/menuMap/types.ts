import { ProductOnCategory } from '@/utils/interfaces/category'
import { MenuCreateProps } from '@/utils/interfaces/menu'
import { Dispatch, SetStateAction } from 'react'
import { DATE_TABS } from '../DateTabs'

export interface MenuMapProps {
  loading: boolean
  isOpenModel: boolean

  handleSave?: (input: MenuCreateProps) => Promise<void>
  handleProductAddCategory?: (input: ProductOnCategory) => Promise<void>
  closeModal: () => void
}

export interface AddProductToCategoryProps {
  day: string
  setCurrentDateTab: Dispatch<SetStateAction<DATE_TABS | undefined>>
  isOpenModel: boolean
  menuProductList: any
  closeModal: () => void

  handleProductAddCategory: (input: ProductOnCategory) => Promise<void>
}
