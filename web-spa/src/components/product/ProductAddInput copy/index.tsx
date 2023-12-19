import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import AddButton from '@/components/addButton'
import { SaveIcon, Trash2 } from 'lucide-react'
import { InputContext } from '@/context/input'
import { ProductContext } from '@/context/product'
import { Hypnosis } from 'react-cssfx-loading'
import { InputsOnProducts, ProductProps } from '../types'
import Modal from '@/components/Modal/modal/Modal'
import Image from 'next/image'
import CustomTextArea from '@/components/customTextArea'
import { Input, InputToProductProps } from '@/components/input/types'

interface CreateProductModalProps {
  isOpen: boolean
  product: ProductProps
  onClose: () => void
}

export default function CreateProductModal({
  isOpen,
  product,
  onClose,
}: CreateProductModalProps) {
  const {
    loading,
    productDetail,
    handleAddInputsToProduct,
    handleProductDetails,
    handleRemoveInputFromProduct,
  } = useContext(ProductContext)
  const { inputList } = useContext(InputContext)

  const [inputState, setInputState] = useState<{
    [inputName: string]: {
      grammage: string
      measurementUnit: string
    }
  }>({})

  const [selectedNewInput, setSelectedNewInput] =
    useState<InputToProductProps | null>(null)

  console.log('DETAILS', productDetail)

  const handleDetails = async () => {
    try {
      await handleProductDetails(product.id)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const productDetails = Array.isArray(productDetail)
    ? productDetail.find((detail: { id: string }) => detail.id === product.id)
    : null

  const handleClose = () => {
    onClose()
  }

  const handleSelectNewInput = (value: string) => {
    const selectedInput = inputList.find((input) => input.name === value)

    if (selectedInput) {
      setSelectedNewInput({
        ...selectedInput,
        grammage: Number(inputState[selectedInput.name]?.grammage) || 0,
        measurementUnit: inputState[selectedInput.name]?.measurementUnit || '',
      })
    } else {
      setSelectedNewInput(null)
    }
  }

  const handleAddNewInput = (input: InputToProductProps) => {
    if (
      !productDetails?.inputs?.some(
        (currentInput: Input) => currentInput.name === input.name
      )
    ) {
      const updatedInputs = [
        {
          id: input.id || '',
          name: input.name,
          grammage: Number(inputState[input.name]?.grammage) || 0,
          measurementUnit: input.measurementUnit,
        },
        ...(productDetails?.inputs || []),
      ]

      if (productDetails) {
        productDetails.inputs = updatedInputs
      }

      setInputState({
        ...inputState,
        [input.name]: {
          grammage: '',
          measurementUnit: '',
        },
      })
    } else {
      console.log('JÁ TEM ESSE INPUT NA LISTA')
    }
  }

  const handleRemoveInput = (input: Input) => {
    const updatedInputList = (productDetails.inputs || []).filter(
      (current) => current.id !== input.id
    )

    // Atualize productDetails.inputs com a nova lista
    productDetails.inputs = updatedInputList

    input.id && product.id && handleRemoveInputFromProduct(product.id, input.id)
  }

  const handleOnSave = async () => {
    onClose()
    const inputsOnProductsArray = getBodyInputToProducts()
    await handleAddInputsToProduct(inputsOnProductsArray)
  }

  const getBodyInputToProducts = () => {
    const productInputResponse: InputsOnProducts = {
      productId: product.id || '',
      input: productDetail?.inputs?.map((input: Input) => ({
        id: input.id || '',
        name: input.name,
        grammage: Number(inputState[input.name]?.grammage) || 0,
        measurementUnit: input.measurementUnit,
      })),
    }

    return productInputResponse
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className={styles.modalProductContainer}>
        {loading ? (
          <Hypnosis color="var(--color-primary)" />
        ) : (
          <div className={styles.EditWrapper}>
            <div className={styles.imageContainer}>
              <div className={styles.imageWrapper}>
                <Image
                  src="https://bakeandcakegourmet.com.br/uploads/site/receitas/strogonoff-de-frango-6xp9zh2o.jpg"
                  alt={productDetail.name}
                  width={250}
                  height={200}
                  className={styles.image}
                />
                <p>{productDetail.name}</p>
              </div>

              <CustomTextArea value={productDetail.description} rows={10} />
            </div>

            <div className={styles.nameAndVariantWrapper}>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                noOptionsText={
                  inputList.length === (productDetails?.inputs || []).length
                    ? 'Todos os insumos foram adicionados'
                    : 'Nenhum insumo disponível para adição'
                }
                options={inputList
                  .filter(
                    (item) =>
                      !(productDetails?.inputs || []).some(
                        (input: Input) => input.name === item.name
                      )
                  )
                  .map((item) => item.name)}
                sx={{
                  '& .MuiAutocomplete-inputRoot': {
                    height: '40px',
                    width: '100%',
                    color: '#BDBDBD',
                    background: '#1F2128',
                  },
                  '& .MuiAutocomplete-popupIndicator': {
                    color: '#0488A6',
                  },
                  '& .MuiAutocomplete-paper': {
                    background: '#272a34 !important',
                    color: '#BDBDBD !important',
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Insumos"
                    InputLabelProps={{
                      style: {
                        color: '#BDBDBD',
                      },
                    }}
                  />
                )}
                onChange={(_, value) => handleSelectNewInput(value || '')}
                disabled={
                  !inputList.some(
                    (item) =>
                      !(productDetail?.inputs || []).some(
                        (input: Input) => input.name === item.name
                      )
                  )
                }
              />

              <div
                className={styles.productCreate}
                onClick={() =>
                  selectedNewInput && handleAddNewInput(selectedNewInput)
                }
                style={{ height: '40px' }}
              >
                ADICIONAR
              </div>
            </div>

            <div className={styles.tableCreateContainer}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <td>Nome</td>
                  <td>Unidade de Medida</td>

                  <td>Gramatura</td>
                </thead>

                <tbody className={styles.tbody}>
                  {productDetail?.inputs?.map((input: Input) => (
                    <tr key={input.id} className={styles.tr}>
                      <td>{input.name}</td>

                      <FormControl fullWidth size="small" key={input.id}>
                        <InputLabel
                          id={`measurementUnit-${input.id}`}
                          sx={{
                            color: '#BDBDBD',
                          }}
                        >
                          {input.measurementUnit}
                        </InputLabel>
                        <Select
                          key={input.id}
                          labelId={`measurementUnit-${input.id}`}
                          id={`measurementUnit-${input.id}`}
                          name={`measurementUnit-${input.id}`}
                          value={inputState[input.name]?.measurementUnit || ''}
                          onChange={(event) => {
                            const { value } = event.target
                            setInputState((prevState) => ({
                              ...prevState,
                              [input.name]: {
                                ...prevState[input.name],
                                measurementUnit: value,
                              },
                            }))
                          }}
                          label="Unidade de Medida"
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                outline: '1px solid #0488A6',
                                background: '#1F2128',
                                color: '#BDBDBD',
                              },
                            },
                          }}
                          sx={{
                            color: '#BDBDBD',
                            margin: 0,
                            '&:before, &:after, &:hover:not(.Mui-disabled):before':
                              {
                                borderColor: '#0488A6 !important',
                              },
                            '& .MuiSelect-icon': {
                              fill: '#0488A6',
                            },
                          }}
                        >
                          {['KG', 'LT', 'CAIXA'].map((option) => (
                            <MenuItem
                              key={option}
                              value={option}
                              sx={{
                                color: '#BDBDBD',
                              }}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <td>
                        <TextField
                          key={input.id}
                          size="small"
                          id={'Gramatura'}
                          label="Gramatura"
                          variant="outlined"
                          name={'grammage'}
                          sx={{
                            color: '#BDBDBD',
                            '& fieldset': {
                              borderColor: '#0488A6',
                            },
                            '&:hover fieldset': {
                              borderColor: '#0488A6',
                            },
                          }}
                          InputLabelProps={{
                            style: {
                              color: '#BDBDBD',
                            },
                          }}
                          InputProps={{
                            inputProps: {
                              inputMode: 'numeric',
                            },
                            style: {
                              color: '#BDBDBD',
                            },
                          }}
                          autoComplete="off"
                          value={inputState[input.name]?.grammage || ''}
                          onChange={(event) => {
                            const { value } = event.target
                            setInputState((prevState) => ({
                              ...prevState,
                              [input.name]: {
                                ...prevState[input.name],
                                grammage: value,
                              },
                            }))
                          }}
                        />
                      </td>
                      <td>
                        <div
                          className={styles.productActionDelete}
                          onClick={() => handleRemoveInput(input)}
                        >
                          <Trash2 color="white" size={18} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <AddButton
              text="SALVAR"
              Icon={SaveIcon}
              onClickButton={handleOnSave}
              isButtonDisabled={!productDetails?.inputs?.length}
            />
          </div>
        )}
      </div>
    </Modal>
  )
}
