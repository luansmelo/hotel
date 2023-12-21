import { ChangeEvent, useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { FormControl, MenuItem, Select, TextField } from '@mui/material'
import AddButton from '@/components/addButton'
import { SaveIcon, Trash2, Plus } from 'lucide-react'
import { InputContext } from '@/context/input'
import { ProductContext } from '@/context/product'
import { Hypnosis } from 'react-cssfx-loading'
import { AddInputToProductModalProps, InputsOnProducts } from '../types'
import Modal from '@/components/Modal/modal/Modal'
import CustomTextArea from '@/components/customTextArea'
import { Input, InputToProductProps } from '@/components/input/types'
import InputSearch from '@/components/atoms/search'
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

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedInputs, setSelectedInputs] = useState<Input[]>([])
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [inputToRemove, setInputToRemove] = useState<Input | null>(null)

  const fetchProductDetails = async () => {
    try {
      await handleProductDetails(product.id)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setSelectedInputs(productDetail?.inputs || [])
  }, [productDetail])

  useEffect(() => {
    fetchProductDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredProductList = searchTerm
    ? inputList?.filter(
        (input: Input) =>
          input?.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !selectedInputs.some(
            (currentInput) => currentInput.name === input.name
          )
      )
    : inputList

  const openDeleteConfirmationDialog = (input: Input) => {
    setInputToRemove(input)
    setIsConfirmDialogOpen(true)
  }
  const closeDeleteConfirmationDialog = () => {
    setIsConfirmDialogOpen(false)
    setInputToRemove(null)
  }
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClose = () => {
    onClose()
  }

  const addInputToSelectedList = (input: Input) => {
    if (
      !selectedInputs.some((currentInput) => currentInput.name === input.name)
    ) {
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

      setSelectedInputs((prevInputs: Input[]) => [
        newInput as Input,
        ...prevInputs,
      ])
    } else {
      console.log('JÁ TEM ESSE INPUT NA LISTA')
    }
  }

  const removeInputFromSelectedList = (input: Input) => {
    setSelectedInputs((prevInputs) =>
      prevInputs.filter((currentInput) => currentInput.id !== input.id)
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
            <div className={styles.inputListSearch}>
              <div>
                <InputSearch
                  search={'insumo'}
                  onChange={handleSearchChange}
                  // disabled={showCreateForm}
                />
              </div>
              <p>{product.name}</p>
            </div>

            <p>Adicionar insumo</p>

            <div className={styles.containerWrapper}>
              <div className={styles.inputListTable}>
                <table className={styles.table}>
                  <tbody className={styles.tbody}>
                    {filteredProductList.length === 0 && (
                      <tr>
                        <td colSpan={4}>
                          <p>Nenhum insumo encontrado</p>
                        </td>
                      </tr>
                    )}
                    {filteredProductList.length > 0 &&
                      filteredProductList?.map((input: Input) => {
                        const isInputInList = productDetail?.inputs?.some(
                          (currentInput: Input) =>
                            currentInput.name === input.name
                        )

                        const isInputInManipulatedList = selectedInputs.some(
                          (currentInput) => currentInput.name === input.name
                        )

                        const isGrammageValid =
                          !isNaN(Number(inputState[input.name]?.grammage)) &&
                          Number(inputState[input.name]?.grammage) > 0

                        if (!isInputInList && !isInputInManipulatedList) {
                          return (
                            <tr key={input.id} className={styles.tr}>
                              <td>{input.name}</td>
                              <td>
                                <FormControl size="small" key={input.id}>
                                  <Select
                                    key={input.id}
                                    labelId={`measurementUnit-${input.id}`}
                                    id={`measurementUnit-${input.id}`}
                                    name={`measurementUnit-${input.id}`}
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
                                      width: '100px',
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
                                  id={'Gramatura'}
                                  label="Gramatura"
                                  variant="outlined"
                                  name={'grammage'}
                                  sx={{
                                    width: '100px',
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
                                <button
                                  className={styles.productActionAdd}
                                  onClick={() => addInputToSelectedList(input)}
                                  disabled={!isGrammageValid}
                                >
                                  <Plus color="white" size={18} />
                                </button>
                              </td>
                            </tr>
                          )
                        }

                        return null
                      })}
                  </tbody>
                </table>
              </div>

              <div className={styles.textAreaContainer}>
                <CustomTextArea value={productDetail.description} rows={10} />
              </div>
            </div>
            <br />

            <hr />

            <p>Lista de insumos</p>
            <div className={styles.containerWrapper}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <td>Nome</td>
                  <td>Unidade de Medida</td>
                  <td>Gramatura</td>
                </thead>

                <div className={styles.tbodyContainer}>
                  <tbody className={styles.tbody}>
                    {selectedInputs.length ? (
                      selectedInputs?.map((input: Input) => (
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
              isButtonDisabled={!selectedInputs.length}
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
