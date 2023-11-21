import { InputContract } from '@/atom/business'
import { useContext } from 'react'
import { Box, TextField } from '@mui/material'
import { InputContext } from '@/context/input'
import { InputForm } from '@/components/input/InputForm/InputForm'
import { handleToastify } from '@/utils/toastify'
import useForm from '@/hooks/useForm'
import Modal from '@/components/Modal/modal/Modal'

interface IInputLineProps {
  showModal: boolean
  input?: InputContract
  isEnabledEditProps?: boolean
  isNewInputProps?: boolean
  handleCancelNewInput?: () => void
  handleCloseModal: () => void
}

export default function InputCreate({
  handleCancelNewInput,
  showModal,
  handleCloseModal,
}: IInputLineProps) {
  const { form, handleSetState } = useForm({
    name: '',
    measurementUnit: '',
    unitPrice: '',
    code: '',
    group: '',
  })

  const { loading, errors, setErrors, handleRequestInput } =
    useContext(InputContext)

  const validateForm = () => {
    const numericUnitPrice = Number(form.unitPrice)

    const newErrors = {
      name: form.name.length < 3 ? 'Nome deve ter no mínimo 3 caracteres' : '',
      measurementUnit:
        form.measurementUnit.length < 2
          ? 'Unidade de medida deve ter no mínimo 3 caracteres'
          : '',
      unitPrice:
        form.unitPrice.trim() === '' || isNaN(numericUnitPrice)
          ? 'Preço unitário deve ser um número válido'
          : '',
      code:
        form.code.length < 3 ? 'Código deve ter no mínimo 3 caracteres' : '',

      group:
        form.group.length < 3 ? 'Grupo deve ter no mínimo 3 caracteres' : '',
    }

    setErrors(newErrors)

    return Object.values(newErrors).every((error) => error === '')
  }

  const handleCreate = async () => {
    try {
      if (!validateForm()) {
        throw new Error('Preencha todos os campos')
      }

      const numericUnitPrice = Number(form.unitPrice)

      if (isNaN(numericUnitPrice)) {
        throw new Error(
          'Os campos de preço e gramatura devem ser números válidos'
        )
      }

      await handleRequestInput({
        ...form,
        unitPrice: numericUnitPrice,
      })

      handleCancelNewInput && handleCancelNewInput()
    } catch (error: any) {
      handleToastify(error.message, 'error')
    }
  }

  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <InputForm
        submit={async (e) => {
          e.preventDefault()
          await handleCreate()
        }}
        loading={loading}
        errors={errors}
      >
        <TextField
          fullWidth
          size="small"
          id="name"
          label="Nome"
          name="name"
          variant="outlined"
          value={form.name}
          onChange={handleSetState}
          sx={{
            '& .MuiInputBase-root': {
              background: '#1F2128',
              color: '#BDBDBD',
              outline: 'none',
              margin: 0,
            },

            '& .MuiFormHelperText-root': {
              margin: 0,
              lineHeight: 1,
            },
          }}
          InputProps={{
            style: {
              background: '#1F2128',
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
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          size="small"
          id="name"
          label="Unidade Medida"
          name="measurementUnit"
          variant="outlined"
          value={form.measurementUnit}
          onChange={handleSetState}
          sx={{
            '& .MuiInputBase-root': {
              background: '#1F2128',
              color: '#BDBDBD',
              outline: 'none',
              margin: 0,
            },

            '& .MuiFormHelperText-root': {
              margin: 0,
              lineHeight: 1,
            },
          }}
          InputProps={{
            style: {
              background: '#1F2128',
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
          error={!!errors.measurementUnit}
          helperText={errors.measurementUnit}
        />

        <TextField
          size="small"
          id="precoUnitario"
          label="Preço Unitário"
          name="unitPrice"
          variant="outlined"
          type="number"
          value={form.unitPrice}
          onChange={handleSetState}
          sx={{
            '& .MuiInputBase-root': {
              background: '#1F2128',
              color: '#BDBDBD',
              outline: 'none',
              margin: 0,
            },

            '& .MuiFormHelperText-root': {
              margin: 0,
              lineHeight: 1,
            },
          }}
          InputProps={{
            style: {
              background: '#1F2128',
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
          error={!!errors.unitPrice}
          helperText={errors.unitPrice}
        />

        <TextField
          size="small"
          id="name"
          label="Código"
          name="code"
          variant="outlined"
          value={form.code}
          onChange={handleSetState}
          sx={{
            '& .MuiInputBase-root': {
              background: '#1F2128',
              color: '#BDBDBD',
              outline: 'none',
              margin: 0,
            },

            '& .MuiFormHelperText-root': {
              margin: 0,
              lineHeight: 1,
            },
          }}
          InputProps={{
            style: {
              background: '#1F2128',
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
          error={!!errors.code}
          helperText={errors.code}
        />

        <TextField
          size="small"
          id="grupo"
          label="Grupo"
          name="group"
          variant="outlined"
          value={form.group}
          onChange={handleSetState}
          sx={{
            '& .MuiInputBase-root': {
              background: '#1F2128',
              color: '#BDBDBD',
              outline: 'none',
              margin: 0,
            },

            '& .MuiFormHelperText-root': {
              margin: 0,
              lineHeight: 1,
            },
          }}
          InputProps={{
            style: {
              background: '#1F2128',
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
          error={!!errors.group}
          helperText={errors.group}
        />
      </InputForm>
    </Modal>
  )
}
