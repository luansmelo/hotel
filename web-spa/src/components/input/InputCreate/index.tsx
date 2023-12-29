import { Form } from '@/components/form'
import useForm from '@/hooks/useForm'
import Modal from '@/components/modal/Modal'
import { InputProps } from '../types'
import TextField from '@/components/textField/TextField'
import Select from '@/components/select'
import { isNotEmpty, isNumber, validateField } from '@/utils/validations'

export default function InputCreate({
  loading,
  errors,
  measurementUnitList,
  groupList,
  showModal,
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

  const validateForm = () => {
    const newErrors = {
      name: validateField('Nome', form.name, isNotEmpty),
      measurementUnit: validateField(
        'Unidade de medida',
        form.measurementUnit,
        isNotEmpty
      ),
      unitPrice:
        validateField('Preço unitário', form.unitPrice, isNumber) ||
        validateField('Preço unitário', form.unitPrice, isNotEmpty),
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
          errors={errors.name}
        />

        <Select
          width="100%"
          name="measurementUnit"
          placeholder="unidade de medida"
          data={measurementUnitList!}
          value={form.measurementUnit}
          onClick={handleSetState}
          errors={errors.measurementUnit}
        />

        <TextField
          label="Preço Unitário"
          name="unitPrice"
          value={form.unitPrice}
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
          placeholder="grupo"
          data={groupList!}
          value={form.group}
          onClick={handleSetState}
          errors={errors.group}
        />
      </Form>
    </Modal>
  )
}
