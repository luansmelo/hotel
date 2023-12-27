import { TextField } from '@mui/material'
import { Form } from '@/components/form'
import useForm from '@/hooks/useForm'
import Modal from '@/components/Modal/modal/Modal'
import { MenuMapProps } from '../types'

export default function CategoryCreate({
  loading,
  isOpenModel,
  errors,
  setErrors,
  closeModal,
  handleSave,
}: MenuMapProps) {
  const { form, handleSetState } = useForm({
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
    closeModal()
    setErrors({})
  }

  const createCategory = async () => {
    try {
      await handleSave(form)
    } catch (error) {
      console.log(error)
    } finally {
      handleModalClose()
      setErrors({})
    }
  }

  return (
    <Modal open={isOpenModel} onClose={closeModal}>
      <Form
        submit={async (e) => {
          e.preventDefault()
          // if (validateForm()) {
          await createCategory()
          // }
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
      </Form>
    </Modal>
  )
}
