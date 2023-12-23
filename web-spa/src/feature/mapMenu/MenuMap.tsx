'use client'

import SelectBusiness from '@/components/selectBusiness'
import styles from './styles.module.scss'
import AddButton from '@/components/addButton'
import DateTabs from '@/components/DateTabs'
import { useEffect, useState, useCallback } from 'react'
import {
  IProductInputDataResponse,
  IProductProps,
  IProductResponse,
} from '@/atom/business'
import AddProductModal from '@/components/Modal/addProductModal'
import { Fade, Modal } from '@mui/material'
import SelectCategory from '@/components/select'
import MenuProductTable from './MenuProductTable'
import { categoryList, useMapContext } from '@/context/MapaContext'
import { useBusinessContext } from '@/context/BusinessContext'

export const colorObj: Record<string, string> = {
  'Café da Manhã': '#FFD700',
  Piscina: '#00BFFF',
  Almoço: '#228B22 ',
  'Café da Tarde': '#FFA500 ',
  Janta: '#8B0000 ',
  Ceia: '#9400D3 ',
}

export default function MenuMap() {
  const [isOpenCreateMenu, setisOpenCreateMenu] = useState(false)
  const {
    currentSelectCategory,
    setcurrentSelectCategory,
    setCurrentDateTab,
    currentDateTab,
    fetchMenuProducts,
    deleteProductFromMenu,
  } = useMapContext()

  const { currentMenuId } = useBusinessContext()

  const handleList = useCallback(
    async (currentMenuId: string) => {
      await fetchMenuProducts(currentMenuId)
    },
    [fetchMenuProducts]
  )

  useEffect(() => {
    handleList(currentMenuId)
  }, [currentMenuId, handleList])

  const handleChangeCategory = (value: string) => {
    setcurrentSelectCategory(value)
  }

  const handleOnSave = (productSelected: IProductProps | undefined) => {
    if (!productSelected) return

    setisOpenCreateMenu(false)
  }

  const handleClickDelete = (product: IProductResponse) => {
    product.id && deleteProductFromMenu(product.id, currentMenuId)
  }

  return (
    <Fade in={true} timeout={500}>
      <div className={styles.MenuMapContainer}>
        <div className={styles.buttonsContainer}>
          <SelectBusiness />
          <AddButton
            text="Adicionar Produto"
            onClickButton={() => setisOpenCreateMenu(true)}
          />
        </div>

        <div className={styles.DateTabsContainer}>
          <SelectCategory
            color={colorObj[currentSelectCategory] ?? ''}
            data={categoryList}
            onClick={handleChangeCategory}
            value={currentSelectCategory}
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

        {isOpenCreateMenu && (
          <Modal
            open={isOpenCreateMenu}
            onClose={() => setisOpenCreateMenu(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <AddProductModal
              title="Adicionar Produto"
              handleOnSave={handleOnSave}
              onClose={() => setisOpenCreateMenu(false)}
              headColor={colorObj[currentSelectCategory] ?? ''}
            />
          </Modal>
        )}
      </div>
    </Fade>
  )
}
