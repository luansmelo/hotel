import Modal from '@/components/Modal/modal/Modal'
import { AddProductToCategoryProps } from '../types'
import AddProductTable from '@/components/Modal/addProductModal/addProductTable'
import { IProductResponse } from '@/atom/business'
import { ProductContext } from '@/context/product'
import { CategoryProps } from '@/utils/interfaces/category'
import styles from './styles.module.scss'
import { memo, useCallback, useContext, useEffect, useState } from 'react'
import { AutoComplete } from '@/components/autoComplete'
import { PlusCircle } from 'lucide-react'

const AddProductToCategory = memo(function AddProductToCategory({
  day,
  isOpenModel,
  menuProductList,
  closeModal,
  handleProductAddCategory,
}: AddProductToCategoryProps) {
  const { productList } = useContext(ProductContext)
  const [currProductList, setCurrProductList] = useState<IProductResponse[]>([])
  const [addedProducts, setAddedProducts] = useState<IProductResponse[]>([])
  const [selectedProduct, setSelectedProducts] = useState<IProductResponse>()

  const addSelectedProduct = (value: string) => {
    setSelectedProducts(
      currProductList.find((input) => input.name === value) as IProductResponse
    )
  }

  const handleRemoveProduct = (productId: string) => {
    const updatedProducts = addedProducts.filter(
      (product) => product.id !== productId
    )
    setAddedProducts(updatedProducts)
  }

  const handleAddProduct = () => {
    if (selectedProduct) {
      setAddedProducts([...addedProducts, selectedProduct])
      setSelectedProducts(undefined)
    }
  }

  const handleList = useCallback(() => {
    const list = productList?.filter(
      (product) =>
        !menuProductList.category?.some(
          (categoryItem: CategoryProps) =>
            categoryItem.schedule?.some(
              (scheduleItem) => scheduleItem.name === product.name
            )
        ) &&
        !addedProducts.some(
          (addedProduct) => addedProduct.name === product.name
        )
    )

    setCurrProductList(list || [])
  }, [productList, setCurrProductList, menuProductList, addedProducts])

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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px',
              }}
            >
              <AutoComplete
                data={currProductList}
                addSelectedItem={addSelectedProduct}
                label="Produtos"
              />

              <div
                className={styles.productCreate}
                style={{ height: '40px' }}
                onClick={handleAddProduct}
              >
                <PlusCircle color="white" size={18} />
              </div>
            </div>
          )}

          <AddProductTable
            weekDay={day}
            category={menuProductList}
            productData={addedProducts}
            onDelete={handleRemoveProduct}
            handleProductAddCategory={handleProductAddCategory}
          />
        </div>
      </div>
    </Modal>
  )
})

export default AddProductToCategory
