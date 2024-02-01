'use client'
import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Button from '@/components/button'
import { PlusCircle, Trash2 } from 'lucide-react'
import { InputContext } from '@/context/input'
import { ProductContext } from '@/context/product'
import { Hypnosis } from 'react-cssfx-loading'
import { AddInputToProductModalProps, InputsOnProducts } from '../types'
import Modal from '@/components/modal/Modal'
import CustomTextArea from '@/components/customTextArea'
import { Input, InputToProductProps } from '@/components/input/types'
import ConfirmDialog from '@/components/dialog'
import { handleToastify } from '@/utils/toastify'
import AutoComplete from '@/components/autoComplete'
import InputTableManipulation from '../ProductEdit/InputTableEdit'
import { TableItem } from '@/components/table/types'
import useGrammageValidation from '@/hooks/useGrammageValidation'

const AddInputToProductModal: React.FC<AddInputToProductModalProps> = ({
  isOpen,
  product,
  measurementUnitList,
  onClose,
}) => {
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

  const { isGrammageValid, validateGrammage } = useGrammageValidation()

  const fetchDetails = async () => {
    try {
      await handleProductDetails(product.id)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDetails()
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

            <InputTableManipulation
              inputState={inputState}
              setInputState={setInputState}
              itemList={addedInputs}
              measurementUnitList={measurementUnitList!}
            >
              {(input: TableItem) => (
                <div
                  className={styles.productActionDelete}
                  onClick={() => openDeleteConfirmationDialog(input as Input)}
                >
                  <Trash2 color="white" size={18} />
                </div>
              )}
            </InputTableManipulation>

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

export default AddInputToProductModal
