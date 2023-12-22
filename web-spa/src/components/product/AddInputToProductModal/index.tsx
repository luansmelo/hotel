import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Autocomplete, TextField } from '@mui/material'
import AddButton from '@/components/addButton'
import { SaveIcon, Trash2, PlusCircle } from 'lucide-react'
import { InputContext } from '@/context/input'
import { ProductContext } from '@/context/product'
import { Hypnosis } from 'react-cssfx-loading'
import { AddInputToProductModalProps, InputsOnProducts } from '../types'
import Modal from '@/components/Modal/modal/Modal'
import CustomTextArea from '@/components/customTextArea'
import { Input, InputToProductProps } from '@/components/input/types'
import ConfirmDialog from '@/components/dialog'

export default function AddInputToProductModal({
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
  const { inputList } = useContext(InputContext)

  const [inputState, setInputState] = useState<{
    [inputName: string]: {
      grammage: string
      measurementUnit: string
    }
  }>({})

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [inputToRemove, setInputToRemove] = useState<Input | null>(null)
  const [addedInputs, setAddedInputs] = useState<Input[]>([])
  const [selectedInput, setSelectedInput] = useState<Input>()

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

  const openDeleteConfirmationDialog = (input: Input) => {
    setInputToRemove(input)
    setIsConfirmDialogOpen(true)
  }
  const closeDeleteConfirmationDialog = () => {
    setIsConfirmDialogOpen(false)
    setInputToRemove(null)
  }

  const addSelectedInput = (value: string) => {
    setSelectedInput(inputList.find((input) => input.name === value))
  }

  const handleClose = () => {
    onClose()
  }

  const addInputToSelectedList = (input: Input) => {
    if (!addedInputs.some((currentInput) => currentInput.name === input.name)) {
      const newInput = {
        id: input.id || '',
        name: input.name,
        grammage: Number(inputState[input.name]?.grammage) || 0,
        measurementUnit:
          inputState[input.name]?.measurementUnit || input.measurementUnit,
      }

      setInputState((prevState) => ({
        ...prevState,
        [input.name]: {
          grammage: '',
          measurementUnit: '',
        },
      }))

      setAddedInputs((prevAddedInputs) => [
        ...prevAddedInputs,
        newInput as Input,
      ])
    } else {
      console.log('JÁ TEM ESSE INPUT NA LISTA')
    }
  }

  const removeInputFromSelectedList = (input: Input) => {
    setAddedInputs((prevInputs) =>
      prevInputs.filter((currentInput) => currentInput.id !== input.id)
    )

    setAddedInputs((prevAddedInputs) =>
      prevAddedInputs.filter((addedInput) => addedInput.id !== input.id)
    )

    setProductDetail((prevProductDetail) => ({
      ...prevProductDetail,
      inputs: (prevProductDetail?.inputs || []).filter(
        (current: InputToProductProps) => current.id !== input.id
      ),
    }))

    closeDeleteConfirmationDialog()
  }

  const saveProductWithInputs = async () => {
    onClose()
    const inputsOnProductsArray = prepareInputsForProduct()

    console.log('INPUT', inputsOnProductsArray)
    await handleAddInputsToProduct(inputsOnProductsArray)
    setAddedInputs([])
  }

  const prepareInputsForProduct = () => {
    const productInputResponse: InputsOnProducts = {
      productId: product.id || '',
      input: addedInputs.map((input: Input) => ({
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
            <div className={styles.inputListSearch}>
              <div>
                <p>{product.name}</p>
              </div>
            </div>

            <hr />

            <div className={styles.containerWrapper}>
              <p>Modo de Preparo:</p>
              <div className={styles.textAreaContainer}>
                <CustomTextArea value={productDetail.description} rows={8} />
              </div>
            </div>

            <hr />
            <p>Insumos:</p>

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
                options={
                  inputList
                    ?.filter((input) => {
                      const isAdded = addedInputs.some(
                        (addedInput) => addedInput.name === input.name
                      )
                      const isExisting = productDetail?.inputs?.some(
                        (existingInput: Input) =>
                          existingInput.name === input.name
                      )
                      return !isAdded && !isExisting
                    })
                    .map((item) => item.name) || []
                }
                sx={{
                  '& .MuiAutocomplete-inputRoot': {
                    height: '40px',
                    width: '100%',
                    background: '#272a34',
                    borderColor: '#0488A6',
                    color: '#BDBDBD',
                  },
                  width: '100%',
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Insumos"
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
                    fullWidth
                  />
                )}
                onChange={(_, value) => addSelectedInput(value || '')}
              />

              <div
                className={styles.productCreate}
                style={{ height: '40px' }}
                onClick={() => {
                  selectedInput && addInputToSelectedList(selectedInput)
                }}
              >
                <PlusCircle color="white" size={18} />
              </div>
            </div>

            <hr />
            <p>Lista adicionados:</p>
            <div className={styles.containerWrapper}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <td>Nome</td>
                  <td>Unidade de Medida</td>
                  <td>Gramatura</td>
                </thead>

                <div className={styles.tbodyContainer}>
                  <tbody className={styles.tbody}>
                    {addedInputs.length ? (
                      [...addedInputs].map((input: Input) => (
                        <tr key={input.id} className={styles.tr}>
                          <td>{input.name}</td>
                          <td>{input.measurementUnit}</td>
                          <td>{input.grammage}</td>
                          <td>
                            <div
                              className={styles.productActionDelete}
                              onClick={() =>
                                openDeleteConfirmationDialog(input)
                              }
                            >
                              <Trash2 color="white" size={18} />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <div className={styles.paragraphContainer}>
                        <p>Nenhum insumo adicionado</p>
                      </div>
                    )}
                  </tbody>
                </div>
              </table>
            </div>

            <AddButton
              text="SALVAR"
              Icon={SaveIcon}
              onClickButton={saveProductWithInputs}
              isButtonDisabled={!addedInputs.length}
            />
          </div>
        )}
      </div>

      {inputToRemove && (
        <ConfirmDialog
          open={isConfirmDialogOpen}
          onClose={closeDeleteConfirmationDialog}
          onConfirm={() => removeInputFromSelectedList(inputToRemove as Input)}
        />
      )}
    </Modal>
  )
}
