'use client'

import styles from './styles.module.scss'
import DateTabs from '@/components/DateTabs'
import { useEffect, useState, useCallback, useContext } from 'react'
import { IProductResponse } from '@/atom/business'
import { Fade } from '@mui/material'
import Select from '@/components/select'
import { useMapContext } from '@/context/MapaContext'
import { useBusinessContext } from '@/context/BusinessContext'
import MenuProductTable from '@/feature/mapMenu/MenuProductTable'
import Dropdown from '@/components/dropDown'
import MenuCreate from '@/components/menuMap/MenuCreate'
import { MenuContext } from '@/context/menu'
import CategoryCreate from '@/components/category/CategoryCreate'
import { CategoryContext } from '@/context/category'

export const colorObj: Record<string, string> = {
  'Café da Manhã': '#FFD700',
  Piscina: '#00BFFF',
  Almoço: '#228B22 ',
  'Café da Tarde': '#FFA500 ',
  Janta: '#8B0000 ',
  Ceia: '#9400D3 ',
}

export default function MenuMap() {
  const [openCreateMenu, setOpenCreateMenu] = useState(false)
  const [openCreateCategory, setOpenCreateCategory] = useState(false)
  const {
    currentSelectCategory,

    setCurrentDateTab,
    currentDateTab,
    fetchMenuProducts,
    deleteProductFromMenu,
  } = useMapContext()

  const { currentMenuId } = useBusinessContext()

  const { loading, menuList, handleSave } = useContext(MenuContext)
  const { categoryList, handleCreateCategory } = useContext(CategoryContext)

  const handleList = useCallback(
    async (currentMenuId: string) => {
      await fetchMenuProducts(currentMenuId)
    },
    [fetchMenuProducts]
  )

  console.log(categoryList)

  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<null | HTMLElement>(
    null
  )
  const [menu, setMenu] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  const openCreateMenuModal = () => {
    setOpenCreateMenu(true)
    setDropdownAnchorEl(null)
  }

  const openCreateCategoryModal = () => {
    setOpenCreateCategory(true)
    setDropdownAnchorEl(null)
  }

  const handleOpenDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setDropdownAnchorEl(event.currentTarget)
  }

  const handleCloseDropdown = () => {
    setDropdownAnchorEl(null)
  }

  useEffect(() => {
    handleList(currentMenuId)
  }, [currentMenuId, handleList])

  const handleCategory = (value: string) => {
    setCategory(value)
  }
  const handleMenu = (value: string) => {
    setMenu(value)
  }

  const handleClickDelete = (product: IProductResponse) => {
    product.id && deleteProductFromMenu(product.id, currentMenuId)
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
                onClick: () => console.log('Adicionar Categoria ao Menu'),
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
              errors={{}}
              setErrors={() => {}}
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
          <MenuProductTable
            headColor={colorObj[currentSelectCategory] ?? ''}
            removeEye
            onClickDelete={handleClickDelete}
          />
        </div>

        {/* {isDropdownOpen && (
          <Modal
            open={openCreateMenu}
            onClose={() => setOpenCreateMenu(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <AddProductModal
              title="Adicionar Produto"
              handleOnSave={handleOnSave}
              onClose={() => setOpenCreateMenu(false)}
              headColor={colorObj[currentSelectCategory] ?? ''}
            />
          </Modal>
        )} */}
      </div>
    </Fade>
  )
}
