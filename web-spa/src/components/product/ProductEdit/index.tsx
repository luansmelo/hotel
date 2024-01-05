import { useContext, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import AddButton from '@/components/button'
import { FileUp, SaveIcon, Trash2 } from 'lucide-react'
import { ProductContext } from '@/context/product'
import { Hypnosis } from 'react-cssfx-loading'
import { AddInputToProductModalProps } from '../types'
import Modal from '@/components/modal/Modal'
import CustomTextArea from '@/components/customTextArea'
import { Input, InputToProductProps } from '@/components/input/types'
import TableHeader from '@/components/atoms/TableHeader'
import useForm from '@/hooks/useForm'
import { TABLE_HEADERS_INPUT_DETAILS } from '@/constants/tableHeader'
import ConfirmDialog from '@/components/dialog'
import TextField from '@/components/textField/TextField'
import Select from '@/components/select'
import ListItem from '@/components/listItem/Index'

export default function ProductEditModal({
  isOpen,
  product,
  measurementUnitList,
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
  const [inputToRemove, setInputToRemove] =
    useState<InputToProductProps | null>(null)

  const openDeleteConfirmationDialog = (input: InputToProductProps) => {
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

  const removeInputFromSelectedList = async (input: Input) => {
    const data = {
      productId: product.id || '',
      inputId: input.id || '',
    }

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
    const productInputResponse = {
      productId: product.id || '',
      name: form.name || productDetail.name,
      description: form.description || productDetail.description,
      inputs: productDetail?.inputs?.map((input) => ({
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

    const gramatureChanged = productDetail?.inputs?.some((input) => {
      return (
        inputState[input.name]?.grammage !== '' &&
        input.grammage !== undefined &&
        String(input.grammage) !== String(inputState[input.name]?.grammage)
      )
    })

    const unitChanged = productDetail?.inputs?.some((input) => {
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
                  label="name"
                  name={'name'}
                  value={form.name}
                  defaultValue={form.name || productDetail.name}
                  onChange={handleSetState}
                  errors={''}
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

            <div className={styles.containerWrapper}>
              {/* <p>Lista de insumos</p> */}
              <table className={styles.table}>
                {/* <TableHeader headers={TABLE_HEADERS_INPUT_DETAILS} /> */}
                <ListItem
                  loading={false}
                  height={200}
                  actions={[]}
                  headers={TABLE_HEADERS_INPUT_DETAILS}
                  itemList={productDetail?.inputs}
                  dynamicFields={[
                    {
                      key: 'name',
                      render: (item) => item.name,
                    },
                    {
                      key: 'grammage',
                      // render: (item) => item.grammage,
                      children: (item) => (
                        <>
                          <Select
                            name={'measurementUnit'}
                            data={measurementUnitList!}
                            width="200px"
                            value={item.measurementUnit}
                            errors={''}
                            onClick={(event) => {
                              const { value } = event.target
                              setInputState((prevState) => ({
                                ...prevState,
                                [item.name]: {
                                  ...prevState[item.name],
                                  measurementUnit: value || '0',
                                },
                              }))
                            }}
                          />

                          <TextField
                            key={item.id}
                            label="Gramatura"
                            name={`grammage`}
                            value={
                              inputState[item.name]?.grammage ||
                              String(item.grammage) ||
                              '0'
                            }
                            onChange={(event) => {
                              const { value } = event.target

                              setInputState((prevState) => ({
                                ...prevState,
                                [item.name]: {
                                  ...prevState[item.name],
                                  grammage: value,
                                },
                              }))
                            }}
                            errors={''}
                          />
                        </>
                      ),
                    },
                  ]}
                />
                {/* <div className={styles.tbodyContainer}>
                  <tbody className={styles.tbody}>
                    {productDetail?.inputs?.map((input) => (
                      <tr key={input.id} className={styles.tr}>
                        <td>{input.name}</td>
                        <td>
                          <Select
                            key={input.id}
                            name={'measurementUnit'}
                            data={measurementUnitList!}
                            width="200px"
                            value={inputState[input.name]?.measurementUnit}
                            onClick={(event) => {
                              const { value } = event.target
                              setInputState((prevState) => ({
                                ...prevState,
                                [input.name]: {
                                  ...prevState[input.name],
                                  measurementUnit: value || '0',
                                },
                              }))
                            }}
                            errors={''}
                          />
                        </td>
                        <td>
                          <TextField
                            key={input.id}
                            label="Gramatura"
                            name={`grammage`}
                            value={
                              inputState[input.name]?.grammage ||
                              String(input.grammage) ||
                              '0'
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
                            errors={''}
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
                </div> */}
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
