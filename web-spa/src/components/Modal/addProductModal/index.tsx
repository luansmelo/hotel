import styles from './styles.module.scss'
import { IProductProps, IProductResponse } from '@/atom/business'
import TemplateModal from '../templateModal'
import { TextField } from '@mui/material'
import { useState, useEffect, useCallback, useContext } from 'react'
import AddProductTable from './addProductTable'
import { ProductContext } from '@/context/product'
import { useMapContext } from '@/context/MapaContext'

interface IProductModalProps {
  title: string
  headColor: string
  onClose: () => void
  handleOnSave: (productSelected: IProductProps | undefined) => void
}

export default function AddProductModal({
  title,
  headColor,
  onClose,
  handleOnSave,
}: IProductModalProps) {
  const [productSelected, setproductSelected] = useState<IProductProps>()
  const { productList } = useContext(ProductContext)
  const { menuProductList } = useMapContext()

  const [currProductList, setCurrProductList] = useState<IProductResponse[]>()

  const handleList = useCallback(() => {
    const lista = productList.filter(
      (product) =>
        !menuProductList.find(
          (menuProduct) => menuProduct.product.name === product.name
        )
    )

    setCurrProductList(lista)
  }, [productList, menuProductList, setCurrProductList])

  useEffect(() => {
    handleList()
  }, [handleList])

  return (
    <TemplateModal onClose={onClose} title={title} headColor={headColor}>
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
            <AddProductTable productData={currProductList} />
          </div>
        )}
      </div>
    </TemplateModal>
  )
}
