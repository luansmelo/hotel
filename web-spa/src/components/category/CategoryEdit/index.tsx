import { Form } from '@/components/form'
import useForm from '@/hooks/useForm'
import Modal from '@/components/modal/Modal'
import { MenuMapProps } from '../types'
import React from 'react'
import TextField from '@/components/textField/TextField'
import { isNotEmpty, validateField } from '@/utils/validations'
import { CategoryProps } from '@/utils/interfaces/category'

export default function CategoryEditForm({
  category,
  loading,
  isOpenModel,
  closeModal,
  handleSave,
}: MenuMapProps) {
  const { form, handleSetState, clear } = useForm(category as CategoryProps)
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
          if (validateForm()) {
            await createCategory()
          }
        }}
        loading={loading}
        text="CADASTRAR"
      >
        <TextField
          name="name"
          onChange={handleSetState}
          value={form.name}
          label="Nome"
          errors={errors.name!}
        />
      </Form>
    </Modal>
  )
}
