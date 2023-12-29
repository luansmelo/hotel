import { Form } from '@/components/form'
import useForm from '@/hooks/useForm'
import Modal from '@/components/Modal/modal/Modal'
import TextField from '@/components/TextField/TextField'
import { MeasurementUnitProps } from './types'
import Separator from '@/components/separator'
import styles from './styles.module.scss'

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
      name: form.name.trim() === '' ? 'Nome é obrigatório' : '',
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
          label="Nome"
          name="name"
          onChange={handleSetState}
          value={form.name}
          height="70px"
        />
      </Form>
    </Modal>
  )
}
