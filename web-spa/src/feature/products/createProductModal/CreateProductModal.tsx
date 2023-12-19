import { useContext } from 'react'
import styles from './styles.module.scss'
import { Autocomplete, Fade, TextField } from '@mui/material'
import AddButton from '@/components/addButton'
import { PlusCircle, SaveIcon, Trash2 } from 'lucide-react'
import TemplateModal from '@/components/Modal/templateModal'
import { InputContext } from '@/context/input'
import { useCallback, useEffect, useState } from 'react'
import { IInputResponse, IProductInputResponse } from '@/atom/business'
import { ProductContext } from '@/context/product'
import { Hypnosis } from 'react-cssfx-loading'

interface IProductModalProps {
  title: string
  onClose: () => void
  productId?: string
}

export default function CreateProductModal({
  title,
  onClose,
  productId,
}: IProductModalProps) {
  const { inputList } = useContext(InputContext)
  const {
    handleProductDetails,
    productDetail,
    isDetailLoading,
    handleAddInputsToProduct,
    handleRemoveInputFromProduct,
  } = useContext(ProductContext)

  const convertToIInputResponse = (
    productInput: IProductInputResponse
  ): IInputResponse => {
    console.log('productInput', productInput)
    setInputQttyList((prevState) => ({
      ...prevState,
      [productInput.productInputName]: productInput.productInputQtty.toString(),
    }))
    return {
      name: productInput.productInputName,
      measurementUnit: productInput.productInputMeasurementUnit,
      group: productInput.productInputGroup,
      unitPrice: productInput.productInputUnitPrice,
      id: productInput.inputId,
    }
  }

  const handleInputList = (): IInputResponse[] => {
    const productInputList = productDetail.productInputs?.map(
      convertToIInputResponse
    )

    return productInputList
  }

  useEffect(() => {
    productDetail && setCurInputList(handleInputList)
  }, [productDetail])

  const currInputQttyList: { [inputName: string]: string } = {}
  const [inputQttyList, setInputQttyList] = useState(currInputQttyList)
  const [curInputList, setCurInputList] = useState<IInputResponse[]>([])
  const [selectedNewInput, setSelectedNewInput] = useState<IInputResponse>()
  const [hasError, setHasError] = useState(true)

  const [isLoading, setIsLoading] = useState(true)

  const handleClose = () => {
    setIsLoading(true)
    setInputQttyList({})
    onClose()
  }

  useEffect(() => {
    const hasError =
      Object.values(inputQttyList).length === 0 ||
      !Object.values(inputQttyList).every((value) => {
        return parseFloat(value) > 0
      })

    setHasError(hasError)
  }, [inputQttyList])

  const handleRequest = useCallback(async () => {
    productId && (await handleGetProductDetails(productId))
  }, [productId])

  const getBodyInputToProducts = () => {
    const productInputResponseArray: IProductInputResponse[] = []

    for (const inputName in inputQttyList) {
      if (Object.prototype.hasOwnProperty.call(inputQttyList, inputName)) {
        const curInput = curInputList.find((input) => input.name === inputName)

        if (curInput) {
          const productInputResponse: IProductInputResponse = {
            ProductId: productId || '',
            InputId: curInput.id || '',
            ProductInputName: curInput.name,
            ProductInputMeasurementUnit: curInput.measurementUnit,
            ProductInputGroup: curInput.group,
            ProductInputUnitPrice: curInput.unitPrice,
            ProductInputQtty: parseInt(inputQttyList[inputName], 10) || 0,
          }

          productInputResponseArray.push(productInputResponse)
        }
      }
    }

    return productInputResponseArray
  }

  useEffect(() => {
    productId && handleRequest()
  }, [handleRequest, productId])

  const handleSelectNewInput = (value: string) => {
    setSelectedNewInput(inputList.find((input) => input.name === value))
  }

  const handleAddNewInput = (input: IInputResponse) => {
    if (
      !curInputList?.some((existingInput) => existingInput.name === input.name)
    ) {
      // Se não existe, adicione o novo input
      const updatedInputList = [...curInputList]
      updatedInputList.push(input)
      setCurInputList(updatedInputList)
      setInputQttyList({
        ...inputQttyList,
        [input.name]: '',
      })
    } else {
      console.log('JÁ TEM ESSE INPUT NA LISTA')
    }
  }

  const handleRemoveInput = (input: IInputResponse) => {
    const indexToRemove = curInputList.findIndex(
      (curInput) => curInput.id === input.id
    )
    const updatedInputList = [...curInputList]
    updatedInputList.splice(indexToRemove, 1)
    setCurInputList(updatedInputList)
    input.id && productId && handleRemoveInputFromProduct(productId, input.id)
  }

  const handleOnSave = () => {
    handleClose()
    handleAddInputsToProduct(getBodyInputToProducts())
  }

  return (
    <TemplateModal onClose={handleClose} title={title} headColor="">
      <div className={styles.modalProductContainer}>
        {isDetailLoading ? (
          <Fade in={true} timeout={250}>
            <div
              style={{
                height: '260px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Hypnosis color="#F28482" />
            </div>
          </Fade>
        ) : (
          <Fade in={true} timeout={1000}>
            <div className={styles.EditWrapper}>
              <div className={styles.nameAndVariantWrapper}>
                <TextField
                  size="small"
                  id="outlined-basic"
                  label="Nome"
                  variant="outlined"
                  fullWidth
                  value={productDetail?.product?.name}
                  disabled
                />
              </div>

              <TextField
                size="small"
                id="outlined-basic"
                label="Descrição"
                variant="outlined"
                fullWidth
                value={productDetail?.product?.productDescription}
                disabled
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
                  options={inputList.map((item) => item.name)}
                  sx={{
                    '& .MuiAutocomplete-inputRoot': {
                      height: '40px',
                      width: '100%',
                    },
                    width: '100%',
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Insumos" />
                  )}
                  onChange={(_, value) => handleSelectNewInput(value || '')}
                />

                <div
                  className={styles.productCreate}
                  onClick={() =>
                    selectedNewInput && handleAddNewInput(selectedNewInput)
                  }
                  style={{ height: '40px' }}
                >
                  <PlusCircle color="white" size={18} />
                </div>
              </div>

              <div className={styles.tableCreateContainer}>
                <table className={styles.table}>
                  {!!curInputList?.length && (
                    <thead className={styles.thead}>
                      <td>Nome</td>
                      <td>Unidade Medida</td>
                      <td>Quantidade</td>
                    </thead>
                  )}

                  <div className={styles.tableInputListContainer}>
                    <tbody className={styles.tbody}>
                      {curInputList?.map((input) => (
                        <tr key={input.name} className={styles.tr}>
                          <td>{input.name}</td>
                          <td>{input.measurementUnit}</td>
                          <td>
                            <TextField
                              size="small"
                              id="name"
                              label="Quantidade"
                              variant="outlined"
                              error={
                                !(parseFloat(inputQttyList[input.name]) > 0)
                              }
                              value={inputQttyList[input.name] || ''}
                              onChange={(event) => {
                                return setInputQttyList({
                                  ...inputQttyList,
                                  [input.name]: event.target.value,
                                })
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
                  </div>
                </table>
              </div>

              <AddButton
                text="Salvar Produto"
                Icon={SaveIcon}
                onClickButton={handleOnSave}
                isButtonDisabled={hasError}
              />
            </div>
          </Fade>
        )}
      </div>
    </TemplateModal>
  )
}
