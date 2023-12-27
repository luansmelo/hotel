import Modal from '@/components/Modal/modal/Modal'
import { AddProductToCategoryProps } from '../types'
import AddProductTable from '@/components/Modal/addProductModal/addProductTable'
import { IProductResponse } from '@/atom/business'
import { ProductContext } from '@/context/product'
import { CategoryProps, ProductWeekDay } from '@/utils/interfaces/category'
import styles from './styles.module.scss'
import { memo, useCallback, useContext, useEffect, useState } from 'react'
import { PlusCircle, SaveIcon } from 'lucide-react'
import AddButton from '@/components/addButton'
import AutoComplete from '@/components/autoComplete'
import { handleToastify } from '@/utils/toastify'
import ConfirmDialog from '@/components/dialog'

const AddProductToCategory = memo(function AddProductToCategory({
  day,
  isOpenModel,
  menuProductList,
  closeModal,
  handleProductAddCategory,
}: AddProductToCategoryProps) {
  const { productList } = useContext(ProductContext)
  const [currProductList, setCurrProductList] = useState<IProductResponse[]>([])
  const [addedProducts, setAddedProducts] = useState<ProductWeekDay[]>([])
  const [selectedProduct, setSelectedProducts] =
    useState<IProductResponse | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const openDeleteConfirmationDialog = () => {
    setIsConfirmDialogOpen(true)
  }

  const closeDeleteConfirmationDialog = () => {
    setIsConfirmDialogOpen(false)
  }

  const addSelectedProduct = (value: string) => {
    setSelectedProducts(
      currProductList.find((input) => input.name === value) as IProductResponse
    )
  }

  const handleRemoveProduct = (productId: string) => {
    setAddedProducts((prevProducts) =>
      prevProducts.filter((product) => product.productId !== productId)
    )
    handleToastify('Produto removido!', 'success')
    closeDeleteConfirmationDialog()
  }

  const handleAddProduct = () => {
    if (selectedProduct) {
      setAddedProducts([
        ...addedProducts,
        {
          name: selectedProduct.name || '',
          productId: selectedProduct.id || '',
          weekDay: day,
        },
      ])
      handleToastify('Produto adicionado!', 'success')
      setSelectedProducts(null)
    }
  }

  const resetFields = () => {
    setCurrProductList([])
    setAddedProducts([])
    setSelectedProducts(null)
  }

  useEffect(() => {
    if (!isOpenModel) {
      resetFields()
    }
  }, [isOpenModel])

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

  const handleClickAddProduct = () => {
    const data = {
      menuId: menuProductList.menuId || '',
      categoryId: (menuProductList.category || [])
        .map((category: CategoryProps) => category.id)
        .join(','),
      product: addedProducts,
    }

    handleProductAddCategory(data)
    closeModal()
  }

  useEffect(() => {
    handleList()
  }, [handleList])

  return (
    <Modal open={isOpenModel} onClose={closeModal}>
      <div className={styles.modalContainer}>
        <div>
          <p>Menu: {menuProductList.name}</p>
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
          productData={addedProducts}
          onDelete={openDeleteConfirmationDialog}
        />

        <ConfirmDialog
          open={isConfirmDialogOpen}
          onClose={closeDeleteConfirmationDialog}
          onConfirm={() => handleRemoveProduct(addedProducts[0].productId)}
        />
        <AddButton
          text="SALVAR"
          Icon={SaveIcon}
          onClickButton={handleClickAddProduct}
          isButtonDisabled={!addedProducts.length}
        />
      </div>
    </Modal>
  )
})

export default AddProductToCategory
