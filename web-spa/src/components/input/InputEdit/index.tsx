import { InputContract } from '@/atom/business'
import { TextField } from '@mui/material'
import { InputForm } from '@/components/input/InputForm/InputForm'
import useForm from '@/hooks/useForm'
import Modal from '@/components/Modal/modal/Modal'
import { InputErrors } from '@/context/input'
import { InputProps } from '../InputList/types'

interface InputEditProps {
  showModal: boolean
  input: InputProps
  loading: boolean
  errors: Record<string, string | number>
  setErrors: React.Dispatch<React.SetStateAction<Partial<InputErrors>>>
  handleEdit: (input: InputContract) => Promise<void>
  handleCloseModal: () => void
}
export default function InputEdit({
  loading,
  errors,
  showModal,
  setErrors,
  handleEdit,
  handleCloseModal,
  input,
}: InputEditProps) {
  const { form, handleSetState } = useForm(input)

  const validateForm = () => {
    const numericUnitPrice = Number(form.unitPrice)

    const newErrors = {
      name: form.name.length < 3 ? 'Nome deve ter no mínimo 3 caracteres' : '',
      measurementUnit:
        form.measurementUnit.length < 2
          ? 'Unidade de medida deve ter no mínimo 3 caracteres'
          : '',
      unitPrice: isNaN(numericUnitPrice)
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

  const handleModalClose = () => {
    setErrors({})
    handleCloseModal()
  }

  const handleUpdate = async () => {
    try {
      const numericUnitPrice = Number(form.unitPrice)

      if (isNaN(numericUnitPrice)) {
        throw new Error('O campo de preço unitário deve ser um número válido')
      }

      await handleEdit({
        ...form,
        unitPrice: numericUnitPrice,
      })
    } catch (error) {
      console.log(error)
    } finally {
      handleModalClose()
      setErrors({})
    }
  }

  return (
    <Modal open={showModal} onClose={handleModalClose}>
      <InputForm
        submit={async (e) => {
          e.preventDefault()
          if (validateForm()) {
            await handleUpdate()
          }
        }}
        loading={loading}
        errors={errors}
        text="ATUALIZAR"
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
          autoComplete="off"
          sx={{
            minHeight: '70px',
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
          autoComplete="off"
          sx={{
            minHeight: '70px',
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
          autoComplete="off"
          sx={{
            minHeight: '70px',
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
          autoComplete="off"
          sx={{
            minHeight: '70px',
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
          autoComplete="off"
          sx={{
            minHeight: '70px',
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
