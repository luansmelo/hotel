import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { FormControl, MenuItem, Select, TextField } from '@mui/material'
import AddButton from '@/components/addButton'
import { FileUp, SaveIcon } from 'lucide-react'
import { ProductContext } from '@/context/product'
import { Hypnosis } from 'react-cssfx-loading'
import { AddInputToProductModalProps, InputsOnProducts } from '../types'
import Modal from '@/components/Modal/modal/Modal'
import CustomTextArea from '@/components/customTextArea'
import { Input, InputToProductProps } from '@/components/input/types'
import ConfirmDialog from '@/components/dialog'
import TableHeader from '@/components/atoms/TableHeader'
import { TABLE_HEADERS_INPUT_DETAILS } from '@/constants/tableHeader'

export default function ProductEditModal({
  isOpen,
  product,
  onClose,
}: AddInputToProductModalProps) {
  const {
    loading,
    productDetail,
    setProductDetail,
    handleAddInputsToProduct,
    handleProductDetails,
  } = useContext(ProductContext)

  const [inputState, setInputState] = useState<{
    [inputName: string]: {
      name: string
      description: string
      grammage: string
      measurementUnit: string
    }
  }>({})

  const [selectedInputs, setSelectedInputs] = useState<Input[]>([])

  const fetchProductDetails = async () => {
    try {
      await handleProductDetails(product.id)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProductDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    onClose()
  }

  const saveProductWithInputs = async () => {
    onClose()
    const inputsOnProductsArray = prepareInputsForProduct()

    await handleAddInputsToProduct(inputsOnProductsArray)
  }

  const prepareInputsForProduct = () => {
    const existingInputs = productDetail?.inputs || []

    const addedInputsSinceLastOpen = selectedInputs.filter(
      (input) =>
        !existingInputs.some(
          (existingInput: Input) => existingInput.name === input.name
        )
    )

    const allInputs = [...existingInputs, ...addedInputsSinceLastOpen]
    console.log('lista:', allInputs)
    const productInputResponse: InputsOnProducts = {
      productId: product.id || '',
      input: allInputs.map((input: Input) => ({
        id: input.id || '',
        name: input.name,
        grammage: Number(input.grammage) || 0,
        measurementUnit:
          inputState[input.name]?.measurementUnit || input.measurementUnit,
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
            <div className={styles.containerWrapper}>
              <div className={styles.uploadFileContainer}>
                <FileUp color="#2196F3" />
                <span className={styles.textWrapper}>
                  <input id="uploadFile" type="file" />
                  <label
                    htmlFor="uploadFile"
                    className={styles.labelUploadFile}
                  >
                    Click to upload
                  </label>
                  <p>or drag and drop</p>
                </span>
                <p>PNG, JPG (max. 2MB)</p>
              </div>
              <div className={styles.inputContainer}>
                <TextField
                  key={productDetail.id}
                  size="small"
                  id={'name'}
                  label="name"
                  variant="outlined"
                  name={'name'}
                  fullWidth
                  sx={{
                    width: '100%',
                    color: '#BDBDBD',
                    '& fieldset': {
                      borderColor: '#0488A6',
                    },
                    '&:hover fieldset': {
                      borderColor: '#0488A6',
                    },
                  }}
                  InputProps={{
                    style: {
                      background: '#272a34',
                      color: '#BDBDBD',
                      outline: 'none',
                      margin: 0,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#BDBDBD',
                    },
                  }}
                  autoComplete="off"
                  defaultValue={
                    inputState[productDetail.name]?.grammage ||
                    productDetail.name
                  }
                  onChange={(event) => {
                    const { value } = event.target
                    setInputState((prevState) => ({
                      ...prevState,
                      [productDetail.name]: {
                        ...prevState[productDetail.name],
                        name: value,
                      },
                    }))
                  }}
                />

                <div className={styles.textAreaContainer}>
                  <CustomTextArea
                    value={
                      inputState[productDetail.description]?.description || ''
                    }
                    rows={10}
                    onChange={(event) => {
                      const { value } = event.target
                      setInputState((prevState) => ({
                        ...prevState,
                        [productDetail.description]: {
                          ...prevState[productDetail.description],
                          description: value,
                        },
                      }))
                    }}
                  />
                </div>
              </div>
            </div>

            <hr />

            <p>Lista de insumos</p>
            <div className={styles.containerWrapper}>
              <table className={styles.table}>
                <TableHeader headers={TABLE_HEADERS_INPUT_DETAILS} />

                <div className={styles.tbodyContainer}>
                  <tbody className={styles.tbody}>
                    {productDetail?.inputs?.map((input: any) => (
                      <tr key={input.id} className={styles.tr}>
                        <td>{input.name}</td>
                        <td>
                          <FormControl
                            size="small"
                            key={input.id}
                            sx={{
                              width: '160px',
                            }}
                          >
                            <Select
                              key={input.id}
                              label="Unidade de Medida"
                              id={`measurementUnit-${input.id}`}
                              name={'measurementUnit'}
                              defaultValue={input.measurementUnit}
                              value={
                                inputState[input.name]?.measurementUnit ||
                                input.measurementUnit
                              }
                              onChange={(event) => {
                                const { value } = event.target
                                setInputState((prevState) => ({
                                  ...prevState,
                                  [input.name]: {
                                    ...prevState[input.name],
                                    measurementUnit: value || '0',
                                  },
                                }))
                              }}
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
                                '& fieldset': {
                                  borderColor: '#0488A6 !important',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#0488A6 !important',
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
                        </td>
                        <td>
                          <TextField
                            key={input.id}
                            size="small"
                            id={`Gramatura-${input.id}`}
                            label="Gramatura"
                            variant="outlined"
                            name={`grammage-${input.id}`}
                            sx={{
                              width: '160px',
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
                            defaultValue={
                              inputState[input.name]?.grammage || input.grammage
                            }
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
                      </tr>
                    ))}
                  </tbody>
                </div>
              </table>
            </div>

            <AddButton
              text="SALVAR"
              Icon={SaveIcon}
              onClickButton={saveProductWithInputs}
              isButtonDisabled={!selectedInputs.length}
            />
          </div>
        )}
      </div>
    </Modal>
  )
}
