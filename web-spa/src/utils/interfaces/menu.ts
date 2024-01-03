import { CategoryProps } from './category'

export interface MenuCreateProps {
  name: string
}

export interface MenuProps {
  id: string
  name: string
}

export interface MenuCategoryProps {
  menuId: string
  categoryId: string
  weekDay: string
  category?: CategoryProps[]
}

export interface MenuToCategoryProps {
  menuId: string
  categoryId: string
}
