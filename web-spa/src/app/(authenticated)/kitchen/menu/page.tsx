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
import { CategoryInput, CategoryProps } from '@/utils/interfaces/category'
import MenuProductTable from '@/components/menuMap/MenuProductRender'
import { Plus, Newspaper, MenuSquare, Soup } from 'lucide-react'
import { FormInputEvent } from '@/hooks/useForm'
import AddCategoryToMenu from '@/components/menuMap/AddCategoryToMenu'
import { MenuCategoryProps } from '@/utils/interfaces/menu'

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

  const [selectedCategory, setSelectedCategory] = useState<CategoryInput>(
    {} as CategoryInput
  )
  const [selectedMenu, setSelectedMenu] = useState<Menu>({} as Menu)
  const {
    loading,
    menuList,
    menuProductList,
    setMenuProductList,
    handleAddCategoryToMenu,
    handleRemoveProduct,
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
    setSelectedCategory({} as CategoryInput)
    setCategory('')
  }
  const handleMenu = (e: FormInputEvent) => {
    const menuFind = menuList.find((menu) => menu.name === e.target.value)
    setSelectedMenu(menuFind as Menu)
    resetModalState()
    setMenu(e.target.value)
  }

  useEffect(() => {
    setMenuProductList({} as MenuCategoryProps)
  }, [setMenuProductList])

  useEffect(() => {
    if (
      selectedMenu.menuId &&
      selectedCategory.id &&
      DATE_TABS[currentDateTab!] !== undefined
    ) {
      const payload = {
        menuId: selectedMenu.menuId || '',
        categoryId: selectedCategory.id || '',
        weekDay: DATE_TABS[currentDateTab!] || '',
      }
      fetchMenuProducts(payload)
    }
  }, [fetchMenuProducts, currentDateTab, selectedCategory, selectedMenu])

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
            width="200px"
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
                disabled: !(
                  selectedMenu?.menuId &&
                  currentDateTab !== undefined &&
                  selectedCategory.id
                ),
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
            setCurrentDateTab={setCurrentDateTab}
            closeModal={() => setOpenCategoryToMenu(false)}
            handleCategoryToMenu={handleAddCategoryToMenu}
          />
        )}

        <Fade in={true} timeout={500}>
          <div className={styles.DateTabsContainer}>
            <Select
              errors={''}
              placeholder="Selecione a categoria"
              disabled={!selectedMenu?.menuId}
              data={(selectedMenu?.category as CategoryInput[]) || []}
              onClick={handleCategory}
              value={category}
              width="200px"
            />

            <DateTabs
              disabled={!selectedCategory.id}
              currentDateTab={currentDateTab!}
              setCurrentDateTab={setCurrentDateTab!}
            />
          </div>
        </Fade>

        <div>
          <MenuProductTable
            loading={loading}
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
      </div>
    </Fade>
  )
}
