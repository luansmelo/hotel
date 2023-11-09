import styles from './styles.module.scss'
import {
  AllProduct,
  IProductProps,
  businessSelectedAtom,
} from '@/atom/business'
import TemplateModal from '../templateModal'
import { TextField } from '@mui/material'
import { useState } from 'react'
import { useAtomValue } from 'jotai'
import AddButton from '@/components/addButton'
import AddProductTable from './addProductTable'

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
  // const [productModal, setProductModal] = useAtom(openProductModal)
  const [productSelected, setproductSelected] = useState<IProductProps>()

  // const [localStorage, setlocalStorage] = useAtom(mockDefaultAtom)
  const businessSelected = useAtomValue(businessSelectedAtom)
  // const business = useAtomValue(businessAtom)

  // const handleAddInputs = (event: any) => {
  //   console.log('aqu', event)
  //   // const inputSelect = businessSelected.products.map((product) => {
  //   //   if (product.code === productInfo.code) {
  //   //     return productInfo
  //   //   } else {
  //   //     return product
  //   //   }
  //   // })

  //   // setlocalStorage({
  //   //   ...localStorage,
  //   //   [business.current]: {
  //   //     inputs: businessSelected.inputs,
  //   //     products: productSelect,
  //   //   },
  //   // })
  // }

  // const handleOnSave = () => {
  //   const productSelect = businessSelected.products.map((product) => {
  //     if (product.code === productInfo.code) {
  //       return productInfo
  //     } else {
  //       return product
  //     }
  //   })

  //   setlocalStorage({
  //     ...localStorage,
  //     [business.current]: {
  //       inputs: businessSelected.inputs,
  //       products: productSelect,
  //     },
  //   })

  //   setProductModal({ ...productModal, isOpen: false })
  // }

  return (
    <TemplateModal onClose={onClose} title={title} headColor={headColor}>
      <div className={styles.modalProductContainer}>
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={AllProduct.map((item) => item.name)}
          sx={{ width: '100%', marginBottom: '36px' }}
          renderInput={(params) => <TextField {...params} label="Pratos" />}
          onChange={(event, newValue) => {
            setproductSelected(
              AllProduct.filter((item) => item.name === newValue)[0]
            )
          }}
        /> */}
        <div style={{ display: 'flex', gap: '60px' }}>
          <div style={{ width: '380px' }}>
            <TextField
              id="search-product"
              variant="outlined"
              placeholder="Buscar por nome do prato"
              fullWidth
            />
          </div>

          <AddButton
            text="Adicionar Prato"
            onClickButton={() => handleOnSave(productSelected)}
          />
        </div>

        <div style={{ marginTop: '24px' }}>
          <AddProductTable productData={AllProduct} />
        </div>
      </div>
    </TemplateModal>
  )
}
