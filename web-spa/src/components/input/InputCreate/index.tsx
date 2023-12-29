import { FormHelperText } from '@mui/material'
import { Form } from '@/components/form'
import useForm from '@/hooks/useForm'
import Modal from '@/components/Modal/modal/Modal'
import { InputProps } from '../types'
import TextField from '@/components/TextField/TextField'
import Select from '@/components/select'

export default function InputCreate({
  loading,
  errors,
  measurementUnitList,
  showModal,
  inputList,
  setErrors,
  handleSave,
  handleCloseModal,
}: InputProps) {
  const { form, handleSetState } = useForm({
    name: '',
    measurementUnit: '',
    unitPrice: '',
    code: '',
    group: '',
  })

  console.log('LISTA', measurementUnitList)

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
      code:
        form.code.trim() === ''
          ? 'Código é obrigatório'
          : inputList?.some((input) => input.code === form.code)
          ? 'Código já existe. Escolha outro.'
          : '',
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
            await createInput()
          }
        }}
        loading={loading}
        errors={errors}
        text="CRIAR"
      >
        <TextField
          label="Nome"
          name="name"
          value={form.name}
          onChange={handleSetState}
          error={!!errors.name}
          helperText={errors.name}
          height="70px"
        />

        <Select
          width="100%"
          name="measurementUnit"
          data={measurementUnitList!}
          value={form.measurementUnit}
          onClick={handleSetState}
        />

        {errors.measurementUnit && (
          <FormHelperText sx={{ color: '#f44336' }}>
            {errors.measurementUnit}
          </FormHelperText>
        )}

        <TextField
          label="Preço Unitário"
          name="unitPrice"
          value={form.unitPrice}
          onChange={handleSetState}
          error={!!errors.unitPrice}
          helperText={errors.unitPrice}
        />

        <TextField
          label="Código"
          name="code"
          value={form.code}
          onChange={handleSetState}
          error={!!errors.code}
          helperText={errors.code}
        />

        <Select
          width="100%"
          data={['PADARIA']}
          onClick={handleSetState}
          name="group"
          value={form.group}
        />
      </Form>
    </Modal>
  )
}
