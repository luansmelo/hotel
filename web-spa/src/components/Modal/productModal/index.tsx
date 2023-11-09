import styles from './styles.module.scss'
import {
  businessAtom,
  businessSelectedAtom,
  mockDefaultAtom,
  openProductModal,
} from '@/atom/business'
import TemplateModal from '../templateModal'
import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import AddButton from '@/components/addButton'
// import TableInputsDetails from '@/components/TableInputsDetails'
import TableInputs from '@/components/TableInputs'
import { PlusCircle } from 'lucide-react'

interface IProductModalProps {
  title: string
  onClose: () => void
}

export default function ProductModal({ title, onClose }: IProductModalProps) {
  const [productModal, setProductModal] = useAtom(openProductModal)
  const [productInfo, setProductInfo] = useState(productModal.productData)
  const [sliderValue, setSliderValue] = useState(0)

  const [localStorage, setlocalStorage] = useAtom(mockDefaultAtom)
  const businessSelected = useAtomValue(businessSelectedAtom)
  const business = useAtomValue(businessAtom)

  const handleAddInputs = (event: any) => {
    console.log('aqu', event)
  }

  const handleOnSave = () => {
    const productSelect = businessSelected.products.map((product) => {
      if (product.code === productInfo.code) {
        return productInfo
      } else {
        return product
      }
    })

    setlocalStorage({
      ...localStorage,
      [business.current]: {
        inputs: businessSelected.inputs,
        products: productSelect,
      },
    })

    setProductModal({ ...productModal, isOpen: false })
  }

  const handleOnCreate = () => {}

  return (
    <TemplateModal onClose={onClose} title={title} headColor="">
      <div className={styles.modalProductContainer}>
        {productModal.editOpen ? (
          <div className={styles.EditWrapper}>
            <div className={styles.nameAndVariantWrapper}>
              <TextField
                size="small"
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                fullWidth
                value={productInfo.code}
                onChange={(event) =>
                  setProductInfo({
                    ...productInfo,
                    code: Number(event.target.value),
                  })
                }
              />
            </div>
            <TextField
              size="small"
              id="outlined-basic"
              label="Descrição"
              variant="outlined"
              fullWidth
              value={productInfo.name}
              onChange={(event) =>
                setProductInfo({ ...productInfo, name: event.target.value })
              }
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={businessSelected.inputs.map((item) => item.name)}
                sx={{
                  '& .MuiAutocomplete-inputRoot': {
                    height: '40px',
                    width: '100%',
                  },
                  width: '100%',
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Insumos"
                    onClick={(event) => handleAddInputs(event)}
                  />
                )}
              />

              <div
                className={styles.productCreate}
                onClick={() => handleOnCreate()}
                style={{ height: '40px' }}
              >
                <PlusCircle color="white" size={18} />
              </div>
            </div>

            <TableInputs
              inputs={productInfo.inputList.map((item) => {
                const checkSliderValue = sliderValue <= 0 ? 1 : sliderValue
                return {
                  ...item,
                  kcal: item.kcal * checkSliderValue,
                  unitPrice: item.unitPrice * checkSliderValue,
                }
              })}
            />

            <AddButton text="Criar Produto" onClickButton={handleOnSave} />
          </div>
        ) : (
          <div className={styles.ViewWrapper}>
            <p>{productInfo.code}</p>
          </div>
        )}
      </div>
    </TemplateModal>
  )
}
