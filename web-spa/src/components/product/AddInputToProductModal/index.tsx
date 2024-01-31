'use client'
import { useCallback, useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Button from '@/components/button'
import { PlusCircle } from 'lucide-react'
import { InputContext } from '@/context/input'
import { ProductContext } from '@/context/product'
import { Hypnosis } from 'react-cssfx-loading'
import { AddInputToProductModalProps, InputsOnProducts } from '../types'
import Modal from '@/components/modal/Modal'
import CustomTextArea from '@/components/customTextArea'
import { Input, InputToProductProps } from '@/components/input/types'
import ConfirmDialog from '@/components/dialog'
import { handleToastify } from '@/utils/toastify'
import Trash from '@/components/atoms/trash'
import AutoComplete from '@/components/autoComplete'
import Select from '@/components/select'
import TextField from '@/components/textField/TextField'

export default function AddInputToProductModal({
  isOpen,
  product,
  measurementUnitList,
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
  const [isGrammageValid, setIsGrammageValid] = useState(true)
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

  const validateGrammage = useCallback((value: string) => {
    const isValid = Number(value) > 0 && !isNaN(Number(value))
    setIsGrammageValid(isValid)
  }, [])

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

      handleToastify('Insumo adicionado com sucesso!', 'success')
    } else {
      handleToastify('Produto não pode ser adicionado!', 'error')
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

    setInputState((prevState) => ({
      ...prevState,
      [input.name]: {
        grammage: '',
        measurementUnit: '',
      },
    }))

    closeDeleteConfirmationDialog()
    handleToastify('Insumo removido com sucesso!', 'success')
  }

  const saveProductWithInputs = async () => {
    onClose()
    const inputsOnProductsArray = prepareInputsForProduct()
    await handleAddInputsToProduct(inputsOnProductsArray)
    setAddedInputs([])
  }

  const prepareInputsForProduct = () => {
    const productInputResponse: InputsOnProducts = {
      productId: product.id || '',
      input: addedInputs.map((input: Input) => ({
        id: input.id || '',
        name: input.name,
        grammage: Number(inputState[input.name]?.grammage) || 0,
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

            <div className={styles.containerWrapper}>
              <div className={styles.textAreaContainer}>
                <CustomTextArea value={productDetail.description} rows={8} />
              </div>
            </div>

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
              <AutoComplete
                label="Insumo"
                data={
                  inputList
                    ?.filter((input) => {
                      const isAdded = addedInputs.some(
                        (addedInput) => addedInput.name === input.name
                      )
                      const isExisting = productDetail?.inputs?.some(
                        (existingInput) => existingInput.name === input.name
                      )
                      return !isAdded && !isExisting
                    })
                    .map((item) => item) || []
                }
                addSelectedItem={addSelectedInput}
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
                          <td>
                            <Select
                              data={measurementUnitList!}
                              key={input.id}
                              name={'measurementUnit'}
                              defaultValue={input.measurementUnit}
                              value={
                                inputState[input.name]?.measurementUnit ||
                                input.measurementUnit
                              }
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
                              defaultValue={
                                inputState[input.name]?.grammage ||
                                String(input.grammage)!
                              }
                              onChange={(event) => {
                                const { value } = event.target

                                validateGrammage(value as string)
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
                          <td>
                            <Trash
                              onClick={() =>
                                openDeleteConfirmationDialog(input)
                              }
                            />
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

            <Button
              loading={loading}
              text="SALVAR"
              onSubmit={saveProductWithInputs}
              disabled={!isGrammageValid}
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
