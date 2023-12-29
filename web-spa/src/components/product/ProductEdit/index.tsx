import { useContext, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { FormControl, MenuItem, Select, TextField } from '@mui/material'
import AddButton from '@/components/addButton'
import { FileUp, SaveIcon, Trash2 } from 'lucide-react'
import { ProductContext } from '@/context/product'
import { Hypnosis } from 'react-cssfx-loading'
import { AddInputToProductModalProps } from '../types'
import Modal from '@/components/Modal/modal/Modal'
import CustomTextArea from '@/components/customTextArea'
import { Input } from '@/components/input/types'
import TableHeader from '@/components/atoms/TableHeader'
import useForm from '@/hooks/useForm'
import { TABLE_HEADERS_INPUT_DETAILS } from '@/constants/tableHeader'
import ConfirmDialog from '@/components/dialog'

export default function ProductEditModal({
  isOpen,
  product,
  onClose,
}: AddInputToProductModalProps) {
  const {
    loading,
    productDetail,
    handleEdit,
    handleProductDetails,
    handleDeleteInputsToProduct,
  } = useContext(ProductContext)

  const { form, handleSetState, clear } = useForm({
    name: product?.name || '',
    description: product?.description || '',
  })

  const formRef = useRef({
    name: product?.name || '',
    description: product?.description || '',
  })

  const [inputState, setInputState] = useState<{
    [inputName: string]: {
      grammage: string
      measurementUnit: string
    }
  }>({})

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [inputToRemove, setInputToRemove] = useState<Input | null>(null)

  const openDeleteConfirmationDialog = (input: Input) => {
    setInputToRemove(input)
    setIsConfirmDialogOpen(true)
  }
  const closeDeleteConfirmationDialog = () => {
    setIsConfirmDialogOpen(false)
    setInputToRemove(null)
  }

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
    clear()
    onClose()
  }

  const saveProductWithInputs = async () => {
    onClose()
    const inputsOnProductsArray = prepareInputsForProduct()

    await handleEdit(productDetail?.id, inputsOnProductsArray)
  }

  const removeInputFromSelectedList = async (input: any) => {
    const data = {
      productId: product.id || '',
      inputId: input.input.id || '',
    }

    console.log('INPUT', input)

    await handleDeleteInputsToProduct(data)

    setInputState((prevState) => ({
      ...prevState,
      [input.name]: {
        grammage: '',
        measurementUnit: '',
      },
    }))

    closeDeleteConfirmationDialog()
  }
  const prepareInputsForProduct = () => {
    const existingInputs = productDetail?.inputs || []

    const productInputResponse = {
      productId: product.id || '',
      name: form.name || productDetail.name,
      description: form.description || productDetail.description,
      inputs: existingInputs.map((input: Input) => ({
        id: input.id || '',
        name: input.name,
        grammage: Number(inputState[input.name]?.grammage) || input.grammage,
        measurementUnit:
          inputState[input.name]?.measurementUnit || input.measurementUnit,
      })),
    }

    return productInputResponse
  }

  const isFormChanged = () => {
    const basicInfoChanged =
      form.name !== product?.name || form.description !== product?.description

    const gramatureChanged = productDetail?.inputs?.some((input: Input) => {
      return (
        inputState[input.name]?.grammage !== '' &&
        input.grammage !== undefined &&
        String(input.grammage) !== String(inputState[input.name]?.grammage)
      )
    })

    const unitChanged = productDetail?.inputs?.some((input: Input) => {
      return (
        inputState[input.name]?.measurementUnit !== '' &&
        input.measurementUnit !== undefined &&
        input.measurementUnit !== inputState[input.name]?.measurementUnit
      )
    })

    return basicInfoChanged || gramatureChanged || unitChanged
  }

  useEffect(() => {
    formRef.current = { ...form }
  }, [form])

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
                  key={product.id}
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
                  defaultValue={form.name || productDetail.name}
                  onChange={handleSetState}
                />

                <div className={styles.textAreaContainer}>
                  <CustomTextArea
                    name="description"
                    value={form.description || ''}
                    rows={10}
                    onChange={handleSetState}
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
                    {productDetail?.inputs?.map((input: Input) => (
                      <tr key={input.id} className={styles.tr}>
                        <td>{input.name}</td>
                        <td>
                          <FormControl
                            key={input.id}
                            size="small"
                            sx={{ width: '250px' }}
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
                            name={`grammage`}
                            fullWidth
                            sx={{
                              width: '250px',
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

                        <div
                          className={styles.productActionDelete}
                          onClick={() => openDeleteConfirmationDialog(input)}
                        >
                          <Trash2 color="white" size={18} />
                        </div>
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
              isButtonDisabled={!isFormChanged() || loading}
            />
          </div>
        )}
      </div>
      {inputToRemove && (
        <ConfirmDialog
          open={isConfirmDialogOpen}
          onClose={closeDeleteConfirmationDialog}
          onConfirm={() => {
            removeInputFromSelectedList(inputToRemove as Input)
          }}
        />
      )}
    </Modal>
  )
}
