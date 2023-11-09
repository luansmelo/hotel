'use client'
import SelectBusiness from '@/components/selectBusiness'
import styles from './styles.module.scss'
import AddButton from '@/components/addButton'
import DateTabs, { DATE_TABS } from '@/components/DateTabs'
import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { IProductProps, businessSelectedAtom } from '@/atom/business'
import AddProductModal from '@/components/Modal/addProductModal'
import { Fade, Modal } from '@mui/material'
import SelectCategory from '@/components/selectCategory'
import MenuProductTable from './MenuProductTable'
import { categoryList, useMapContext } from '@/context/MapaContext'

const colorObj: Record<string, string> = {
  'Café da Manhã': '#FFD700',
  Piscina: '#00BFFF',
  Almoço: '#228B22 ',
  'Café da Tarde': '#FFA500 ',
  Janta: '#8B0000 ',
  Ceia: '#9400D3 ',
}

export default function MenuMap() {
  const [currentDateTab, setCurrentDateTab] = useState(DATE_TABS.SUNDAY)
  const [isOpenCreateMenu, setisOpenCreateMenu] = useState(false)
  const { currentSelectCategory, setcurrentSelectCategory } = useMapContext()

  console.log('currentSelectCategory', currentSelectCategory)
  const businessSelected = useAtomValue(businessSelectedAtom)

  const [productList, setProductList] = useState(businessSelected.products)

  const handleChangeCategory = (value: string) => {
    setcurrentSelectCategory(value)
  }

  const handleOnSave = (productSelected: IProductProps | undefined) => {
    if (!productSelected) return

    setProductList([...productList, productSelected])
    setisOpenCreateMenu(false)
  }

  return (
    <Fade in={true} timeout={500}>
      <div className={styles.MenuMapContainer}>
        <div className={styles.buttonsContainer}>
          <SelectBusiness />
          <AddButton
            text="Adicionar Prato"
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
            productData={productList}
            headColor={colorObj[currentSelectCategory] ?? ''}
            removeEye
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
              title="Adicionar Prato"
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
