import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { Form } from '@/components/form'
import useForm from '@/hooks/useForm'
import Modal from '@/components/Modal/modal/Modal'
import { Input, InputProps } from '../types'

export default function InputEdit({
  loading,
  errors,
  showModal,
  setErrors,
  handleSave,
  handleCloseModal,
  input,
}: InputProps) {
  const { form, handleSetState } = useForm(input as Input)

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

      await handleSave({
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
      <Form
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
            MenuProps={{
              PaperProps: {
                sx: {
                  background: '#1F2128',
                  color: '#BDBDBD',
                },
              },
            }}
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

        <FormControl fullWidth size="small" sx={{ minHeight: '70px' }}>
          <InputLabel
            id="groupLabel"
            sx={{
              color: '#BDBDBD',
            }}
          >
            Grupo
          </InputLabel>
          <Select
            labelId="groupLabel"
            id="group"
            name="group"
            value={form.group}
            onChange={handleSetState}
            label="Grupo"
            error={!!errors.group}
            MenuProps={{
              PaperProps: {
                sx: {
                  background: '#1F2128',
                  color: '#BDBDBD',
                },
              },
            }}
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
            {['CONGELADOS', 'PADARIA', 'LANCHONETE'].map((option) => (
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
          {errors.group && (
            <FormHelperText sx={{ color: '#f44336' }}>
              {errors.group}
            </FormHelperText>
          )}
        </FormControl>
      </Form>
    </Modal>
  )
}
