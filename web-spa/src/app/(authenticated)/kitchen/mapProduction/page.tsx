'use client'

import styles from './styles.module.scss'
import DateTabs, { DATE_TABS } from '@/components/dateTabs'
import { useState, useContext, useEffect } from 'react'
import { Fade } from '@mui/material'
import Select from '@/components/select'
import { MenuContext } from '@/context/menu'
import { CategoryContext } from '@/context/category'
import { CategoryInput, CategoryProps } from '@/utils/interfaces/category'
import MenuProductTable from '@/components/menuMap/MenuProductRender'
import { FormInputEvent } from '@/hooks/useForm'
import { MenuCategoryProps } from '@/utils/interfaces/menu'

export interface Menu {
  menuId: string
  name: string
  category: CategoryProps[]
}

export default function MapProduction() {
  const [currentDateTab, setCurrentDateTab] = useState<DATE_TABS | undefined>(
    undefined
  )
  const [peopleNumber, setPeopleNumber] = useState(1)

  const [selectedCategory, setSelectedCategory] = useState<CategoryInput>(
    {} as CategoryInput
  )
  const [selectedMenu, setSelectedMenu] = useState<Menu>({} as Menu)
  const {
    loading,
    menuList,
    menuProductList,
    setMenuProductList,
    handleRemoveProduct,
    fetchMenuProducts,
  } = useContext(MenuContext)
  const { categoryList } = useContext(CategoryContext)

  const [menu, setMenu] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  const handleCategory = (e: FormInputEvent) => {
    const categoryFind = categoryList.find(
      (category) => category.name === e.target.value
    )

    setSelectedCategory({
      id: categoryFind?.id ?? '',
      name: categoryFind?.name ?? '',
    })

    setCategory(e.target.value)
  }
  const resetModalState = () => {
    setSelectedCategory({} as CategoryInput)
    setCategory('')

    setMenuProductList({} as MenuCategoryProps)
  }
  const handleMenu = (e: FormInputEvent) => {
    const menuFind = menuList.find((menu) => menu.name === e.target.value)
    setCurrentDateTab(undefined)
    setSelectedMenu(menuFind as Menu)
    resetModalState()
    setMenu(e.target.value)
  }

  useEffect(() => {
    setMenuProductList({} as MenuCategoryProps)
  }, [setMenuProductList])
  console.log(
    !(selectedMenu?.menuId && currentDateTab && selectedCategory.id),
    selectedMenu?.menuId,
    currentDateTab,
    selectedCategory.id
  )
  return (
    <Fade in={true} timeout={500}>
      <div className={styles.MenuMapContainer}>
        <div className={styles.buttonsContainer}>
          <Select
            placeholder="Selecione o menu"
            data={menuList! || []}
            onClick={handleMenu}
            value={menu}
            errors={''}
          />
        </div>

        <Fade in={true} timeout={500}>
          <div className={styles.DateTabsContainer}>
            <Select
              errors={''}
              placeholder="Selecione a categoria"
              disabled={!selectedMenu?.menuId}
              data={(selectedMenu?.category as CategoryInput[]) || []}
              onClick={handleCategory}
              value={category}
            />

            <DateTabs
              disabled={!selectedCategory.id}
              currentDateTab={currentDateTab!}
              setCurrentDateTab={setCurrentDateTab!}
            />
          </div>
        </Fade>

        <MenuProductTable
          loading={loading}
          fetchMenuProducts={fetchMenuProducts}
          onClickDelete={handleRemoveProduct}
          {...{
            data: {
              selectedMenu,
              selectedCategory,
              currentDateTab: DATE_TABS[currentDateTab!],
            },
            menuProductList,
          }}
        />
      </div>
    </Fade>
  )
}
