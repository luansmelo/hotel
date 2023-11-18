import { InputContract } from '@/atom/business'

import { useContext, useState } from 'react'
import { TextField } from '@mui/material'
import { InputContext } from '@/context/input'
import { InputForm } from '@/components/input/InputForm/InputForm'

interface IInputLineProps {
  input?: InputContract
  isEnabledEditProps?: boolean
  isNewInputProps?: boolean
  handleCancelNewInput?: () => void
}

export default function InputLine({ handleCancelNewInput }: IInputLineProps) {
  const [name, setName] = useState('')
  const [measurementUnit, setMeasurementUnit] = useState('')
  const [unitPrice, setUnitPrice] = useState(0)
  const [code, setCode] = useState('')
  const [grammage, setGrammage] = useState(0)
  const [group, setGroup] = useState('')

  const { handleRequestInput } = useContext(InputContext)

  const handleCreate = async () => {
    try {
      const input = {
        name,
        measurementUnit,
        unitPrice,
        code,
        grammage,
        group,
      }

      await handleRequestInput(input)

      handleCancelNewInput && handleCancelNewInput()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <InputForm
        submit={async (e) => {
          e.preventDefault()
          await handleCreate()
        }}
        loading={false}
      >
        <TextField
          size="small"
          id="name"
          label="Nome"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          size="small"
          id="name"
          label="Unidade Medida"
          variant="outlined"
          value={measurementUnit}
          onChange={(event) => setMeasurementUnit(event.target.value)}
        />

        <TextField
          size="small"
          id="precoUnitario"
          label="Preço Unitário"
          variant="outlined"
          type="number"
          value={unitPrice}
          onChange={(event) => setUnitPrice(Number(event.target.value))}
        />

        <TextField
          size="small"
          id="name"
          label="Código"
          variant="outlined"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />

        <TextField
          size="small"
          id="name"
          label="Gramatura"
          variant="outlined"
          value={grammage}
          onChange={(event) => setGrammage(Number(event.target.value))}
        />

        <TextField
          size="small"
          id="grupo"
          label="Grupo"
          variant="outlined"
          value={group}
          onChange={(event) => setGroup(event.target.value)}
        />
      </InputForm>
    </>
  )
}
