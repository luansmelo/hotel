import { Form } from '@/components/form'
import useForm from '@/hooks/useForm'
import Modal from '@/components/Modal/modal/Modal'
import { MenuMapProps } from '../types'
import TextField from '@/components/TextField/TextField'
import { isNotEmpty, validateField } from '@/utils/validations'
import React from 'react'

export default function MenuCreate({
  loading,
  isOpenModel,
  closeModal,
  handleSave,
}: MenuMapProps) {
  const { form, handleSetState, clear } = useForm({
    name: '',
  })
  const [errors, setErrors] = React.useState<Partial<Error>>({})

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
    closeModal()
  }

  const createMenu = async () => {
    try {
      if (handleSave) await handleSave(form)
    } catch (error) {
      console.log(error)
    } finally {
      handleModalClose()
    }
  }

  return (
    <Modal open={isOpenModel} onClose={closeModal}>
      <Form
        submit={async (e) => {
          e.preventDefault()
          if (validateForm()) {
            await createMenu()
          }
        }}
        loading={loading}
        text="CADASTRAR"
      >
        <TextField
          name="name"
          value={form.name}
          onChange={handleSetState}
          label="nome"
          height="70px"
          errors={errors.name!}
        />
      </Form>
    </Modal>
  )
}
