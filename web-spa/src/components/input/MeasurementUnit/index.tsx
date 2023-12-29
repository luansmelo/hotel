import { Form } from '@/components/form'
import useForm from '@/hooks/useForm'
import Modal from '@/components/modal/Modal'
import TextField from '@/components/textField/TextField'
import { MeasurementUnitProps } from './types'
import Separator from '@/components/separator'
import styles from './styles.module.scss'
import { isNotEmpty, validateField } from '@/utils/validations'

export default function MeasurementUnitCreate({
  loading,
  errors,
  isOpen,
  setErrors,
  handleSave,
  handleCloseModal,
}: MeasurementUnitProps) {
  const { form, handleSetState, clear } = useForm({
    name: '',
  })

  const validateForm = () => {
    const newErrors = {
      name: validateField('Nome', form.name, isNotEmpty),
    }

    setErrors(newErrors)

    return Object.values(newErrors).every((error) => error === '')
  }

  const handleModalClose = () => {
    clear()
    setErrors({})
    handleCloseModal()
  }

  const createInput = async () => {
    try {
      await handleSave({
        name: form.name.toUpperCase(),
      })
    } catch (error) {
      console.log(error)
    } finally {
      handleModalClose()
      setErrors({})
    }
  }

  return (
    <Modal open={isOpen} onClose={handleModalClose}>
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
        <p className={styles.paragraph}>Criar Unidade de Medida</p>

        <Separator />

        <TextField
          height="70px"
          label="Nome"
          name="name"
          onChange={handleSetState}
          value={form.name}
          errors={errors.name}
        />
      </Form>
    </Modal>
  )
}
