import { IInputResponse } from '@/atom/business'
import styles from './styles.module.scss'
import { useState } from 'react'
import { TextField } from '@mui/material'
import { Pencil, PlusCircle, SaveIcon, Trash2, XCircle } from 'lucide-react'
import { useInputContext } from '@/context/InputContext'

interface IInputLineProps {
  input: IInputResponse
  isEnabledEditProps?: boolean
  isNewInputProps?: boolean
  handleCancelNewInput?: () => void
}

export default function InputLine({
  input,
  isEnabledEditProps,
  isNewInputProps,
  handleCancelNewInput,
}: IInputLineProps) {
  const [isEnabledEdit, setEnableEdit] = useState(isEnabledEditProps)
  const [inputValues, setInputValues] = useState(input)
  const { handleRequestNewInput, handleUpdateInput, handleDeleteInput } =
    useInputContext()

  const isNewProduct = isNewInputProps

  const handleOnSave = () => {
    handleUpdateInput(inputValues.id as string, { ...inputValues })
    setEnableEdit(false)
  }

  const handleOnCreate = () => {
    handleRequestNewInput(inputValues)
    handleCancelNewInput && handleCancelNewInput()
  }

  const handleDelete = () => {
    handleDeleteInput(inputValues.id as string)
  }

  const handleCancelEdit = () => {
    setEnableEdit(false)
  }

  const disabledCreateInput =
    !inputValues.code.length ||
    !inputValues.name.length ||
    !inputValues.measurementUnit.length ||
    !inputValues.unitPrice ||
    !inputValues.group.length ||
    !inputValues.grammage

  return (
    <tr className={styles.tr}>
      {!isEnabledEdit ? (
        <>
          <td>{inputValues.code}</td>
          <td>{inputValues.name}</td>
          <td>{inputValues.unitPrice.toFixed(0)}</td>
          <td>{inputValues.measurementUnit}</td>
          <td>{inputValues.group}</td>
          <td>{inputValues.grammage}</td>

          <div className={styles.productActions}>
            <div
              className={styles.productActionView}
              onClick={() => setEnableEdit(true)}
            >
              <Pencil color="#D96262" size={18} />
            </div>
            <div
              className={styles.productActionDelete}
              onClick={() => handleDelete()}
            >
              <Trash2 color="white" size={18} />
            </div>
          </div>
        </>
      ) : (
        <div className={styles.inputContainer}>
          <div>
            <TextField
              sx={{ width: '100px' }}
              size="small"
              id="codigo"
              label="Código"
              variant="outlined"
              value={inputValues.code}
              onChange={(event) =>
                setInputValues({ ...inputValues, code: event.target.value })
              }
            />
          </div>
          <div>
            <TextField
              sx={{ width: '100px' }}
              size="small"
              id="name"
              label="Nome"
              variant="outlined"
              value={inputValues.name}
              onChange={(event) =>
                setInputValues({ ...inputValues, name: event.target.value })
              }
            />
          </div>
          <div>
            <TextField
              sx={{ width: '100px' }}
              size="small"
              id="precoUnitario"
              label="Preço Unitário"
              variant="outlined"
              type="number"
              value={inputValues.unitPrice}
              onChange={(event) =>
                setInputValues({
                  ...inputValues,
                  unitPrice: Number(event.target.value),
                })
              }
            />
          </div>
          <div>
            <TextField
              sx={{ width: '100px' }}
              size="small"
              id="name"
              label="Unidade Medida"
              variant="outlined"
              value={inputValues.measurementUnit}
              onChange={(event) =>
                setInputValues({
                  ...inputValues,
                  measurementUnit: event.target.value,
                })
              }
            />
          </div>
          <div>
            <TextField
              sx={{ width: '100px' }}
              size="small"
              id="grupo"
              label="Grupo"
              variant="outlined"
              value={inputValues.group}
              onChange={(event) =>
                setInputValues({
                  ...inputValues,
                  group: event.target.value,
                })
              }
            />
            <TextField
              sx={{ width: '100px' }}
              size="small"
              id="gramatura"
              label="Gramatura"
              variant="outlined"
              value={inputValues.grammage}
              onChange={(event) =>
                setInputValues({
                  ...inputValues,
                  grammage: Number(event.target.value),
                })
              }
            />
          </div>

          {isNewProduct ? (
            <td>
              <button
                className={styles.productCreate}
                onClick={() => handleOnCreate()}
                disabled={disabledCreateInput}
              >
                <PlusCircle color="white" size={18} />
                Criar
              </button>
              <div
                className={styles.productCancel}
                onClick={() => handleCancelNewInput && handleCancelNewInput()}
              >
                <XCircle color="white" size={18} />
              </div>
            </td>
          ) : (
            <td>
              <div
                className={styles.productActionView}
                onClick={() => handleOnSave()}
              >
                <SaveIcon color="#D96262" size={18} />
              </div>
              <div
                className={styles.productActionDelete}
                onClick={() => handleCancelEdit()}
              >
                <XCircle color="white" size={18} />
              </div>
            </td>
          )}
        </div>
      )}
    </tr>
  )
}
