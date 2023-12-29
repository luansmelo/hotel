import { Form } from '@/components/form'
import useForm from '@/hooks/useForm'
import Modal from '@/components/Modal/modal/Modal'
import TextField from '@/components/TextField/TextField'
import Separator from '@/components/separator'
import styles from './styles.module.scss'
import { isNotEmpty, validateField } from '@/utils/validations'
import { GroupPropsContract } from './types'

export default function GroupCreate({
  loading,
  errors,
  isOpen,
  setErrors,
  handleSave,
  handleCloseModal,
}: GroupPropsContract) {
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
        <p className={styles.paragraph}>Criar Grupo</p>

        <Separator />

        <TextField
          height="70px"
          value={form.name}
          label="Nome"
          name="name"
          onChange={handleSetState}
          errors={errors.name}
        />
      </Form>
    </Modal>
  )
}
