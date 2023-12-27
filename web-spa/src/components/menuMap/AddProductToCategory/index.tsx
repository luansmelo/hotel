import Modal from '@/components/Modal/modal/Modal'
import { AddProductToCategoryProps } from '../types'
import AddProductTable from '@/components/Modal/addProductModal/addProductTable'
import { IProductResponse } from '@/atom/business'
import { ProductContext } from '@/context/product'
import { CategoryProps } from '@/utils/interfaces/category'
import styles from './styles.module.scss'
import { memo, useCallback, useContext, useEffect, useState } from 'react'

const AddProductToCategory = memo(function AddProductToCategory({
  day,
  isOpenModel,
  menuProductList,
  closeModal,
  handleProductAddCategory,
}: AddProductToCategoryProps) {
  const { productList } = useContext(ProductContext)
  const [currProductList, setCurrProductList] = useState<IProductResponse[]>()

  const handleList = useCallback(() => {
    const list = productList?.filter(
      (product) =>
        !menuProductList.category?.some(
          (categoryItem: CategoryProps) =>
            categoryItem.schedule?.some(
              (scheduleItem) => scheduleItem.name === product.name
            )
        )
    )

    setCurrProductList(list)
  }, [productList, setCurrProductList, menuProductList])

  useEffect(() => {
    handleList()
  }, [handleList])

  return (
    <Modal open={isOpenModel} onClose={closeModal}>
      <div className={styles.modalContainer}>
        <div className={styles.modalProductContainer}>
          <div>
            <p>Categorias:</p>

            <div>Lista de categorias com Select</div>
          </div>
          {currProductList && (
            <div style={{ marginTop: '24px' }}>
              <AddProductTable
                weekDay={day}
                productData={currProductList}
                category={menuProductList}
                handleProductAddCategory={handleProductAddCategory}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
})

export default AddProductToCategory
