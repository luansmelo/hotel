'use client'

import styles from './styles.module.scss'
import DateTabs, { DATE_TABS } from '@/components/DateTabs'
import { useState, useContext, useEffect, useCallback } from 'react'
import { Fade } from '@mui/material'
import Select from '@/components/select'
import Dropdown from '@/components/dropDown'
import MenuCreate from '@/components/menuMap/MenuCreate'
import { MenuContext } from '@/context/menu'
import CategoryCreate from '@/components/category/CategoryCreate'
import { CategoryContext } from '@/context/category'
import AddProductToCategory from '@/components/menuMap/AddProductToCategory'
import { CategoryProps } from '@/utils/interfaces/category'
import MenuProductTable from '@/components/menuMap/MenuProductRender'
import { MenuCategoryProps } from '@/utils/interfaces/menu'

export interface Menu {
  menuId: string
  name: string
  category: CategoryProps[]
}

export default function MenuMap() {
  const [openCreateMenu, setOpenCreateMenu] = useState(false)
  const [openCreateCategory, setOpenCreateCategory] = useState(false)
  const [openAddCategoryToMenu, setOpenAddCategoryToMenu] = useState(false)
  const [currentDateTab, setCurrentDateTab] = useState<DATE_TABS>(
    DATE_TABS.DOMINGO
  )
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps>(
    {} as CategoryProps
  )
  const [selectedMenu, setSelectedMenu] = useState<Menu>({} as Menu)
  const {
    loading,
    menuList,
    menuProductList,
    setMenuProductList,
    handleSave,
    fetchMenuProducts,
  } = useContext(MenuContext)
  const { categoryList, handleCreateCategory, handleProductAddCategory } =
    useContext(CategoryContext)

  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<null | HTMLElement>(
    null
  )
  const [menu, setMenu] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  console.log(selectedMenu)

  useEffect(() => {
    const data = {
      menuId: selectedMenu.menuId,
      categoryId: selectedCategory.id,
      weekDay: DATE_TABS[currentDateTab],
    }

    fetchMenuProducts(data as MenuCategoryProps)
  }, [fetchMenuProducts, currentDateTab, selectedCategory.id, selectedMenu])

  const openCreateMenuModal = () => {
    setOpenCreateMenu(true)
    setDropdownAnchorEl(null)
  }

  const openCreateCategoryModal = () => {
    setOpenCreateCategory(true)
    setDropdownAnchorEl(null)
  }

  const openAddCategoryToMenuModal = () => {
    setOpenAddCategoryToMenu(true)
    setDropdownAnchorEl(null)
  }

  const handleOpenDropdown = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setDropdownAnchorEl(event.currentTarget)
    },
    []
  )

  const handleCloseDropdown = () => {
    setDropdownAnchorEl(null)
  }

  const handleCategory = (value: string) => {
    const categoryFind = categoryList.find(
      (category) => category.name === value
    )

    setSelectedCategory({
      id: categoryFind?.id ?? '',
      name: categoryFind?.name ?? '',
    })
    setCurrentDateTab(DATE_TABS.DOMINGO)

    setCategory(value)
  }
  const resetModalState = () => {
    setSelectedCategory({} as CategoryProps)
    setCategory('')
    setCurrentDateTab(DATE_TABS.DOMINGO)
    setMenuProductList([])
  }
  const handleMenu = (value: string) => {
    const menuFind = menuList.find((menu) => menu.name === value)

    setSelectedMenu(menuFind as Menu)
    resetModalState()
    setMenu(value)
  }

  return (
    <Fade in={true} timeout={500}>
      <div className={styles.MenuMapContainer}>
        <div className={styles.buttonsContainer}>
          <Select data={menuList} onClick={handleMenu} value={menu} />
          <button className={styles.button} onClick={handleOpenDropdown}>
            +
          </button>

          <Dropdown
            actions={[
              { label: 'Criar Menu', onClick: openCreateMenuModal },
              {
                label: 'Criar Categoria',
                onClick: openCreateCategoryModal,
              },
              {
                label: 'Adicionar Categoria ao Menu',
                onClick: openAddCategoryToMenuModal,
              },
              {
                label: 'Adicionar Produto à Categoria',
                onClick: () => console.log('Adicionar Produto à Categoria'),
              },
            ]}
            onClose={handleCloseDropdown}
            anchorEl={dropdownAnchorEl}
          />
        </div>

        <div>
          {openCreateMenu && (
            <MenuCreate
              loading={loading}
              isOpenModel={openCreateMenu}
              handleSave={handleSave}
              closeModal={() => setOpenCreateMenu(false)}
            />
          )}

          {openCreateCategory && (
            <CategoryCreate
              isOpenModel={openCreateCategory}
              loading={loading}
              errors={{}}
              setErrors={() => {}}
              closeModal={() => setOpenCreateCategory(false)}
              handleSave={handleCreateCategory}
            />
          )}
        </div>
        {openAddCategoryToMenu && (
          <AddProductToCategory
            day={DATE_TABS[currentDateTab]}
            menuProductList={menuProductList}
            isOpenModel={openAddCategoryToMenu}
            closeModal={() => setOpenAddCategoryToMenu(false)}
            handleProductAddCategory={handleProductAddCategory}
          />
        )}

        {selectedMenu?.menuId && (
          <Fade in={true} timeout={500}>
            <div className={styles.DateTabsContainer}>
              {selectedMenu.category && (
                <Select
                  disabled={!selectedMenu.category.length}
                  data={selectedMenu.category}
                  onClick={handleCategory}
                  value={category}
                />
              )}
              {selectedCategory.id && (
                <DateTabs
                  disabled={!selectedCategory.id}
                  currentDateTab={currentDateTab}
                  setCurrentDateTab={setCurrentDateTab}
                />
              )}
            </div>
          </Fade>
        )}

        <div>
          <MenuProductTable
            removeEye
            menuProductList={menuProductList}
            onClickDelete={() => console.log('remover')}
          />
        </div>
      </div>
    </Fade>
  )
}
