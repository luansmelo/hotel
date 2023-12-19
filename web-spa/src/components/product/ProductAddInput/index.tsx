import { ChangeEvent, useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import AddButton from '@/components/addButton'
import { SaveIcon, Trash2, Plus } from 'lucide-react'
import { InputContext } from '@/context/input'
import { ProductContext } from '@/context/product'
import { Hypnosis } from 'react-cssfx-loading'
import { InputsOnProducts, ProductProps } from '../types'
import Modal from '@/components/Modal/modal/Modal'
import CustomTextArea from '@/components/customTextArea'
import { Input } from '@/components/input/types'
import InputSearch from '@/components/atoms/search'

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
  } = useContext(ProductContext)
  const { inputList } = useContext(InputContext)

  const [inputState, setInputState] = useState<{
    [inputName: string]: {
      grammage: string
      measurementUnit: string
    }
  }>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [existingInputs, setExistingInputs] = useState<Input[]>([])
  const [manipulatedInputs, setManipulatedInputs] = useState<Input[]>([])

  const handleDetails = async () => {
    try {
      await handleProductDetails(product.id)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // Atualize existingInputs quando houver mudança nos detalhes do produto
    setExistingInputs(productDetail?.inputs || [])
  }, [productDetail])

  useEffect(() => {
    handleDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredProductList = searchTerm
    ? inputList?.filter(
        (input: Input) =>
          input?.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !manipulatedInputs.some(
            (currentInput) => currentInput.name === input.name
          ) &&
          !existingInputs.some(
            (currentInput) => currentInput.name === input.name
          )
      )
    : inputList

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClose = () => {
    onClose()
  }

  const handleAddNewInput = (input: Input) => {
    if (
      !existingInputs.some(
        (currentInput) => currentInput.name === input.name
      ) &&
      !manipulatedInputs.some(
        (currentInput) => currentInput.name === input.name
      )
    ) {
      const newInput = {
        id: input.id || '',
        name: input.name,
        grammage: Number(inputState[input.name]?.grammage) || 0,
        measurementUnit: input.measurementUnit,
      }

      setInputState((prevState) => ({
        ...prevState,
        [input.name]: {
          grammage: '',
          measurementUnit: '',
        },
      }))

      setManipulatedInputs((prevInputs: Input[]) => [
        ...prevInputs,
        newInput as Input,
      ])
    } else {
      console.log('JÁ TEM ESSE INPUT NA LISTA')
    }
  }

  const handleRemoveInput = (input: Input) => {
    setManipulatedInputs((prevInputs) =>
      prevInputs.filter((currentInput) => currentInput.id !== input.id)
    )

    const updatedInputList = (productDetail.inputs || []).filter(
      (current: Input) => current.id !== input.id
    )
    productDetail.inputs = updatedInputList

    setExistingInputs((prevInputs) =>
      prevInputs.filter((currentInput) => currentInput.id !== input.id)
    )
  }

  const handleOnSave = async () => {
    onClose()
    const inputsOnProductsArray = getBodyInputToProducts()

    console.log('O QUE ENVIADO', inputsOnProductsArray)
    await handleAddInputsToProduct(inputsOnProductsArray)
  }

  const getBodyInputToProducts = () => {
    const addedInputsSinceLastOpen = existingInputs.filter(
      (input) =>
        !existingInputs.some(
          (existingInput) => existingInput.name === input.name
        )
    )

    const productInputResponse: InputsOnProducts = {
      productId: product.id || '',
      input: addedInputsSinceLastOpen.map((input: Input) => ({
        id: input.id || '',
        name: input.name,
        grammage: Number(inputState[input.name]?.grammage) || 0,
        measurementUnit: input.measurementUnit,
      })),
    }

    return productInputResponse
  }

  console.log(filteredProductList)

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className={styles.modalProductContainer}>
        {loading ? (
          <Hypnosis color="var(--color-primary)" />
        ) : (
          <div className={styles.EditWrapper}>
            <div>
              <InputSearch
                search={'insumo'}
                onChange={handleSearchChange}
                // disabled={showCreateForm}
              />
            </div>
            <div className={styles.containerWrapper}>
              <div className={styles.inputListTable}>
                <table className={styles.table}>
                  <tbody className={styles.tbody}>
                    {!filteredProductList.length ? (
                      <p>Nenhum insumo encontrado</p>
                    ) : (
                      filteredProductList?.map((input: Input) => {
                        const isInputInList = productDetail?.inputs?.some(
                          (currentInput: Input) =>
                            currentInput.name === input.name
                        )

                        const isInputInManipulatedList = manipulatedInputs.some(
                          (currentInput) => currentInput.name === input.name
                        )

                        if (!isInputInList && !isInputInManipulatedList) {
                          return (
                            <tr key={input.id} className={styles.tr}>
                              <td>{input.name}</td>
                              <td>
                                <FormControl size="small" key={input.id}>
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
                                    value={
                                      inputState[input.name]?.measurementUnit ||
                                      ''
                                    }
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
                                      width: '90px',
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
                                    width: '90px',
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
                                  onClick={() => handleAddNewInput(input)}
                                >
                                  <Plus color="white" size={18} />
                                </div>
                              </td>
                            </tr>
                          )
                        }

                        return null
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <CustomTextArea value={productDetail.description} rows={10} />
            </div>

            <div className={styles.tableCreateContainer}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <td>Nome</td>
                  <td>Unidade de Medida</td>
                  <td>Gramatura</td>
                </thead>

                <tbody className={styles.tbody}>
                  {manipulatedInputs?.map((input: Input) => (
                    <tr key={input.id} className={styles.tr}>
                      <td>{input.name}</td>
                      <td>{input.measurementUnit}</td>
                      <td>{input.grammage}</td>
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

                  {(existingInputs || []).map((input: Input) => (
                    <tr key={input.id} className={styles.tr}>
                      <td>{input.name}</td>
                      <td>{input.measurementUnit}</td>
                      <td>{input.grammage}</td>
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
              isButtonDisabled={!productDetail?.inputs?.length}
            />
          </div>
        )}
      </div>
    </Modal>
  )
}
