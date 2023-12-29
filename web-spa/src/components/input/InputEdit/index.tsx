import { Form } from '@/components/form'
import useForm from '@/hooks/useForm'
import Modal from '@/components/modal/Modal'
import { Input, InputProps } from '../types'
import Select from '@/components/select'
import { isNotEmpty, isNumber, validateField } from '@/utils/validations'
import TextField from '@/components/textField/TextField'

export default function InputEdit({
  loading,
  errors,
  groupList,
  measurementUnitList,
  showModal,
  setErrors,
  handleSave,
  handleCloseModal,
  input,
}: InputProps) {
  const { form, handleSetState } = useForm(input as Input)

  const validateForm = () => {
    const newErrors = {
      name: validateField('Nome', form.name, isNotEmpty),
      measurementUnit: validateField(
        'Unidade de medida',
        form.measurementUnit,
        isNotEmpty
      ),
      unitPrice:
        validateField('Preço unitário', String(form.unitPrice), isNumber) ||
        validateField('Preço unitário', String(form.unitPrice), isNotEmpty),
      code: validateField('Código', form.code, isNotEmpty),
      group: validateField('Grupo', form.group, isNotEmpty),
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
          label="Nome"
          name="name"
          value={form.name}
          onChange={handleSetState}
          errors={errors.name}
        />

        <Select
          width="100%"
          placeholder="Selecione uma unidade de medida"
          name="measurementUnit"
          value={form.measurementUnit}
          onClick={handleSetState}
          data={measurementUnitList!}
          errors={errors.measurementUnit}
        />

        <TextField
          label="Preço unitário"
          name="unitPrice"
          value={String(form.unitPrice)}
          onChange={handleSetState}
          errors={errors.unitPrice}
        />

        <TextField
          label="Código"
          name="code"
          value={form.code}
          onChange={handleSetState}
          errors={errors.code}
        />

        <Select
          width="100%"
          name="group"
          placeholder="Selecione um grupo"
          value={form.group}
          data={groupList!}
          onClick={handleSetState}
          errors={errors.group}
        />
      </Form>
    </Modal>
  )
}
