import Modal from '@/components/Modal/modal/Modal'
import { AddProductToCategoryProps } from '../types'
import { TextField } from '@mui/material'
import AddProductTable from '@/components/Modal/addProductModal/addProductTable'
import { IProductResponse } from '@/atom/business'
import { useCallback, useContext, useEffect, useState } from 'react'
import { ProductContext } from '@/context/product'
import { useMapContext } from '@/context/MapaContext'
import { ProductOnCategory } from '@/utils/interfaces/category'
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

  const handleModalClose = () => {
    closeModal()
  }

  useEffect(() => {
    handleList()
  }, [handleList])

  const addProductToCategory = async (input: ProductOnCategory) => {
    try {
      if (handleProductAddCategory) {
        await handleProductAddCategory(input)
      }
    } catch (error) {
      console.log(error)
    } finally {
      handleModalClose()
    }
  }

  console.log(day)

  return (
    <Modal open={isOpenModel} onClose={closeModal}>
      <div className={styles.modalProductContainer}>
        <div style={{ width: '600px', display: 'flex', gap: '60px' }}>
          <div style={{ width: '340px' }}>
            <TextField
              id="search-product"
              variant="outlined"
              placeholder="Buscar por nome do prato"
              fullWidth
            />
          </div>
        </div>

        {currProductList && (
          <div style={{ marginTop: '24px' }}>
            <AddProductTable
              weekDay={day}
              productData={currProductList}
              categoryId={categoryList.categoryId}
            />
          </div>
        )}
      </div>
    </Modal>
  )
}
