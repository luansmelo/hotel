'use client'

import styles from './styles.module.scss'
import DateTabs, { DATE_TABS } from '@/components/dateTabs'
import React, { useState, useContext, useEffect, useCallback } from 'react'
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
import { Plus, Newspaper, MenuSquare, Soup } from 'lucide-react'
import { FormInputEvent } from '@/hooks/useForm'
import AddCategoryToMenu from '@/components/menuMap/AddCategoryToMenu'

export interface Menu {
  menuId: string
  name: string
  category: CategoryProps[]
}

export default function MenuMap() {
  const [openCreateMenu, setOpenCreateMenu] = useState(false)
  const [openCategoryToMenu, setOpenCategoryToMenu] = useState(false)
  const [openCreateCategory, setOpenCreateCategory] = useState(false)

  const [openAddProductToCateogory, setOpenAddProductToCategory] =
    useState(false)
  const [currentDateTab, setCurrentDateTab] = useState<DATE_TABS | undefined>(
    undefined
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
    handleAddCategoryToMenu,
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

  const openCreateMenuModal = () => {
    setOpenCreateMenu(true)
    setDropdownAnchorEl(null)
  }

  const openAddCategoryToMenu = () => {
    setOpenCategoryToMenu(true)
    setDropdownAnchorEl(null)
  }

  const openCreateCategoryModal = () => {
    setOpenCreateCategory(true)
    setDropdownAnchorEl(null)
  }

  const openAddProductToCategory = () => {
    setOpenAddProductToCategory(true)
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
    setSelectedCategory({} as CategoryProps)
    setCategory('')

    setMenuProductList([])
  }
  const handleMenu = (e: FormInputEvent) => {
    const menuFind = menuList.find((menu) => menu.name === e.target.value)

    setSelectedMenu(menuFind as Menu)
    resetModalState()
    setMenu(e.target.value)
  }

  useEffect(() => {
    setMenuProductList([])
  }, [setMenuProductList])

  console.log(openCategoryToMenu)

  return (
    <Fade in={true} timeout={500}>
      <div className={styles.MenuMapContainer}>
        <div className={styles.buttonsContainer}>
          <Select
            placeholder="Selecione o menu"
            data={menuList}
            onClick={handleMenu}
            value={menu}
            errors={''}
          />
          <button className={styles.button} onClick={handleOpenDropdown}>
            +
          </button>

          <Dropdown
            actions={[
              {
                label: 'Cadastrar menu',
                onClick: openCreateMenuModal,
                icon: <MenuSquare />,
              },
              {
                label: 'Cadastar categoria',
                onClick: openCreateCategoryModal,
                icon: <Newspaper />,
              },
              {
                label: 'Adicionar categoria ao menu',
                onClick: openAddCategoryToMenu,
                icon: <Plus />,
              },
              {
                label: 'Adicionar produto a categoria',
                onClick: openAddProductToCategory,
                icon: <Soup />,
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
        {openAddProductToCateogory && (
          <AddProductToCategory
            day={DATE_TABS[currentDateTab!]}
            setCurrentDateTab={setCurrentDateTab}
            menuProductList={menuProductList}
            isOpenModel={openAddProductToCateogory}
            closeModal={() => setOpenAddProductToCategory(false)}
            handleProductAddCategory={handleProductAddCategory}
          />
        )}

        {openCategoryToMenu && (
          <AddCategoryToMenu
            loading={loading}
            menuList={menuList}
            categoryList={categoryList}
            isOpenModel={openCategoryToMenu}
            closeModal={() => setOpenCategoryToMenu(false)}
            handleProductAddCategory={handleAddCategoryToMenu}
          />
        )}

        {selectedMenu?.menuId && (
          <Fade in={true} timeout={500}>
            <div className={styles.DateTabsContainer}>
              {selectedMenu.category && (
                <Select
                  errors={''}
                  placeholder="Selecione a categoria"
                  disabled={!selectedMenu.category.length}
                  data={selectedMenu.category}
                  onClick={handleCategory}
                  value={category}
                />
              )}
              {selectedCategory.id && (
                <DateTabs
                  disabled={!selectedCategory.id}
                  currentDateTab={currentDateTab!}
                  setCurrentDateTab={setCurrentDateTab!}
                />
              )}
            </div>
          </Fade>
        )}

        <div>
          <MenuProductTable
            removeEye
            fetchMenuProducts={fetchMenuProducts}
            {...{
              data: {
                selectedMenu,
                selectedCategory,
                currentDateTab: DATE_TABS[currentDateTab!],
              },
              menuProductList,
              onClickDelete: () => console.log('remover'),
            }}
          />
        </div>
      </div>
    </Fade>
  )
}
