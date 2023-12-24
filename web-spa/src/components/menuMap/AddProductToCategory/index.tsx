import Modal from '@/components/Modal/modal/Modal'
import { AddProductToCategoryProps } from '../types'
import { TextField } from '@mui/material'
import AddProductTable from '@/components/Modal/addProductModal/addProductTable'
import { IProductResponse } from '@/atom/business'
import { useCallback, useContext, useEffect, useState } from 'react'
import { ProductContext } from '@/context/product'
import { useMapContext } from '@/context/MapaContext'
import styles from './styles.module.scss'

export default function AddProductToCategory({
  day,
  isOpenModel,
  categoryList,
  closeModal,
  handleProductAddCategory,
}: AddProductToCategoryProps) {
  const { productList } = useContext(ProductContext)
  const { menuProductList } = useMapContext()

  const [currProductList, setCurrProductList] = useState<IProductResponse[]>()

  const handleList = useCallback(() => {
    const list = productList?.filter(
      (product) =>
        !menuProductList.find(
          (menuProduct) => menuProduct.product.name === product.name
        )
    )

    setCurrProductList(list)
  }, [productList, menuProductList, setCurrProductList])

  useEffect(() => {
    handleList()
  }, [handleList])

  return (
    <Modal open={isOpenModel} onClose={closeModal}>
      <div className={styles.modalContainer}>
        <div className={styles.modalProductContainer}>
          <TextField
            id="search-product"
            variant="outlined"
            placeholder="Buscar por nome do prato"
            fullWidth
          />

          {currProductList && (
            <div style={{ marginTop: '24px' }}>
              <AddProductTable
                weekDay={day}
                productData={currProductList}
                categoryId={categoryList.categoryId!}
                handleProductAddCategory={handleProductAddCategory}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
