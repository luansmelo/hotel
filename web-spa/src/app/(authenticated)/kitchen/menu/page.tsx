'use client'

import styles from './styles.module.scss'
import DateTabs, { DATE_TABS } from '@/components/DateTabs'
import { useState, useContext, useEffect } from 'react'
import { Fade } from '@mui/material'
import Select from '@/components/select'
import Dropdown from '@/components/dropDown'
import MenuCreate from '@/components/menuMap/MenuCreate'
import { MenuContext } from '@/context/menu'
import CategoryCreate from '@/components/category/CategoryCreate'
import { CategoryContext } from '@/context/category'
import AddProductToCategory from '@/components/menuMap/AddProductToCategory'
import { CategoryProps } from '@/utils/interfaces/category'
import MenuProductTable from '@/feature/mapMenu/MenuProductTable'

interface CategoryType {
  id: string
  name: string
  // outras propriedades, se houver
}

export default function MenuMap() {
  const [openCreateMenu, setOpenCreateMenu] = useState(false)
  const [openCreateCategory, setOpenCreateCategory] = useState(false)
  const [openAddCategoryToMenu, setOpenAddCategoryToMenu] = useState(false)
  const [currentDateTab, setCurrentDateTab] = useState<DATE_TABS>(
    DATE_TABS.SEGUNDA
  )
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps>(
    {} as CategoryProps
  )
  const [selectedMenu, setSelectedMenu] = useState<string>('')
  const { loading, menuList, handleSave, fetchMenuProducts } =
    useContext(MenuContext)
  const { categoryList, handleCreateCategory, handleProductAddCategory } =
    useContext(CategoryContext)

  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<null | HTMLElement>(
    null
  )
  const [menu, setMenu] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  useEffect(() => {
    const data = {
      menuId: selectedMenu,
      categoryId: selectedCategory.categoryId!,
      weekDay: DATE_TABS[currentDateTab],
    }

    fetchMenuProducts(data)
  }, [
    fetchMenuProducts,
    currentDateTab,
    selectedCategory.categoryId,
    selectedMenu,
  ])

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

  const handleOpenDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setDropdownAnchorEl(event.currentTarget)
  }

  const handleCloseDropdown = () => {
    setDropdownAnchorEl(null)
  }

  const handleCategory = (value: string) => {
    const categoryFind = categoryList.find(
      (category: any) => category.name === value
    )

    setSelectedCategory({
      categoryId: categoryFind?.id ?? '',
      name: categoryFind?.name ?? '',
    })

    setCategory(value)
  }

  const handleMenu = (value: string) => {
    const menuFind = menuList.find((menu: any) => menu.name === value)

    setSelectedMenu(menuFind?.id ?? '')

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
            categoryList={selectedCategory}
            isOpenModel={openAddCategoryToMenu}
            closeModal={() => setOpenAddCategoryToMenu(false)}
            handleProductAddCategory={handleProductAddCategory}
          />
        )}

        <div className={styles.DateTabsContainer}>
          <Select
            data={categoryList}
            onClick={handleCategory}
            value={category}
          />
          <DateTabs
            currentDateTab={currentDateTab}
            setCurrentDateTab={setCurrentDateTab}
          />
        </div>

        <div>
          <MenuProductTable removeEye onClickDelete={() => console.log('')} />
        </div>
      </div>
    </Fade>
  )
}
