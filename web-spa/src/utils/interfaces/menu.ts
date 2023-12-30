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
}

export interface MenuToCategoryProps {
  menuId: string
  categoryId: string
}
