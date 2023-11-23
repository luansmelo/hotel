import { InputContract } from '@/atom/business'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { InputForm } from '@/components/input/InputForm/InputForm'
import useForm from '@/hooks/useForm'
import Modal from '@/components/Modal/modal/Modal'
import { InputErrors } from '@/context/input'

interface InputProps {
  loading: boolean
  errors: Record<string, string | number>
  setErrors: React.Dispatch<React.SetStateAction<Partial<InputErrors>>>
  handleCreate: (input: InputContract) => Promise<void>
  showModal: boolean
  handleCloseModal: () => void
}

export default function InputCreate({
  loading,
  errors,
  showModal,
  setErrors,
  handleCreate,
  handleCloseModal,
}: InputProps) {
  const { form, handleSetState } = useForm({
    name: '',
    measurementUnit: '',
    unitPrice: '',
    code: '',
    group: '',
  })

  const validateForm = () => {
    const numericUnitPrice = Number(form.unitPrice)

    const newErrors = {
      name: form.name.trim() === '' ? 'Nome é obrigatório' : '',
      measurementUnit:
        form.measurementUnit.trim() === ''
          ? 'Unidade de medida é obrigatória'
          : '',
      unitPrice:
        form.unitPrice.trim() === '' || isNaN(numericUnitPrice)
          ? 'Preço unitário deve ser um número válido'
          : '',
      code: form.code.trim() === '' ? 'Código é obrigatório' : '',
      group: form.group.trim() === '' ? 'Grupo é obrigatório' : '',
    }

    setErrors(newErrors)

    return Object.values(newErrors).every((error) => error === '')
  }

  const handleModalClose = () => {
    setErrors({})
    handleCloseModal()
  }

  const createInput = async () => {
    try {
      const numericUnitPrice = Number(form.unitPrice)

      if (isNaN(numericUnitPrice)) {
        throw new Error('O campo de preço unitário deve ser um número válido')
      }

      await handleCreate({
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
            await createInput()
          }
        }}
        loading={loading}
        errors={errors}
        text="CRIAR"
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

        <FormControl fullWidth size="small" sx={{ minHeight: '70px' }}>
          <InputLabel
            id="measurementUnitLabel"
            sx={{
              color: '#BDBDBD',
            }}
          >
            Unidade de Medida
          </InputLabel>
          <Select
            labelId="measurementUnitLabel"
            id="measurementUnit"
            name="measurementUnit"
            value={form.measurementUnit}
            onChange={handleSetState}
            label="Unidade de Medida"
            error={!!errors.measurementUnit}
            sx={{
              background: '#1F2128',
              color: '#BDBDBD',
              outline: 'none',
              margin: 0,
              '&:focus': {
                background: '#1F2128',
              },
            }}
          >
            <MenuItem
              value="KG"
              sx={{
                color: '#BDBDBD',
              }}
            >
              KG
            </MenuItem>
            <MenuItem
              value="LT"
              sx={{
                color: '#BDBDBD',
              }}
            >
              LT
            </MenuItem>
          </Select>
          {errors.measurementUnit && (
            <FormHelperText sx={{ color: '#f44336' }}>
              {errors.measurementUnit}
            </FormHelperText>
          )}
        </FormControl>

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
