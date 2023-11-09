import InputSearchProduct from '@/components/InputSearchProduct'
import styles from './styles.module.scss'
import AddButton from '@/components/addButton'
import { Fade, Modal, TextField } from '@mui/material'
import ProductListTable from './ProductListTable'
import { useProductContext } from '@/context/ProductContext'
import { useState } from 'react'
import { PlusCircle, XCircle } from 'lucide-react'
import CreateProductModal from './createProductModal/CreateProductModal'
import { IProductResponse } from '@/atom/business'

export default function ProductList() {
  const [openCreateProductModal, setOpenCreateProductModal] = useState(false)
  const [hasNewProduct, setHasNewProduct] = useState(false)
  const [currNewProduct, setCurrNewProduct] = useState<IProductResponse>({
    name: '',
    productDescription: '',
  })
  const [currProductDetailId, setCurrProductDetailId] = useState('')

  const { productList, handleAddProduct, handleDeleteProduct } =
    useProductContext()

  const handleProductDetail = (productId: string) => {
    setOpenCreateProductModal(true)
    setCurrProductDetailId(productId)
  }

  const handleCreateProduct = () => {
    setHasNewProduct(true)
  }

  const handleRequestCreateProduct = async () => {
    await handleAddProduct(currNewProduct).then(() => {
      setHasNewProduct(false)
      setCurrNewProduct({
        name: '',
        productDescription: '',
      })
    })
  }

  const handleCancelCreateProduct = () => {
    setHasNewProduct(false)
  }

  const handleProductDelete = async (productId: string) => {
    await handleDeleteProduct(productId)
  }

  return (
    <Fade in={true} timeout={500}>
      <div className={styles.productListContainer}>
        <div className={styles.productListHeader}>
          <InputSearchProduct />
          <AddButton
            text="Criar Produto"
            onClickButton={() => handleCreateProduct()}
          />
        </div>

        {hasNewProduct && (
          <Fade in={true} timeout={750}>
            <div className={styles.newproductListMainView}>
              <table className={styles.tablenew}>
                <thead className={styles.theadnew}>
                  <tr
                    style={{
                      color: '#000',
                      width: '100%',
                    }}
                  >
                    <td style={{ color: '#000' }}>Nome</td>
                    <td style={{ color: '#000' }}>Descrição</td>
                  </tr>
                </thead>
              </table>
              <tbody className={styles.tbodynew}>
                <div>
                  <tr>
                    <td>
                      <TextField
                        size="small"
                        id="name"
                        label="Nome"
                        variant="outlined"
                        value={currNewProduct.name || ''}
                        onChange={(event) =>
                          setCurrNewProduct({
                            ...currNewProduct,
                            name: event.target.value,
                          })
                        }
                      />
                    </td>
                    <td style={{ width: '350px' }}>
                      <TextField
                        size="small"
                        id="decricao"
                        label="Descrição"
                        variant="outlined"
                        sx={{ width: '450px' }}
                        value={currNewProduct.productDescription || ''}
                        onChange={(event) =>
                          setCurrNewProduct({
                            ...currNewProduct,
                            productDescription: event.target.value,
                          })
                        }
                      />
                    </td>

                    <td>
                      <button
                        className={styles.productCreate}
                        disabled={
                          !currNewProduct.productDescription.length ||
                          !currNewProduct.name.length
                        }
                        onClick={() => handleRequestCreateProduct()}
                      >
                        <PlusCircle color="white" size={18} />
                        Criar
                      </button>
                      <div
                        className={styles.productCancel}
                        onClick={handleCancelCreateProduct}
                      >
                        <XCircle color="white" size={18} />
                      </div>
                    </td>
                  </tr>
                </div>
              </tbody>
            </div>
          </Fade>
        )}

        {!!productList.length && !hasNewProduct && (
          <ProductListTable
            productData={productList}
            onClickView={handleProductDetail}
            onClickDelete={handleProductDelete}
          />
        )}

        {openCreateProductModal && (
          <Modal
            open={openCreateProductModal}
            onClose={() => setOpenCreateProductModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <CreateProductModal
              productId={currProductDetailId}
              title="Editar Produto"
              onClose={() => setOpenCreateProductModal(false)}
            />
          </Modal>
        )}

        {/* <div className={styles.productListFooter}>
          <Pagination shape="rounded" count={10} color="primary" />
        </div> */}
      </div>
    </Fade>
  )
}
