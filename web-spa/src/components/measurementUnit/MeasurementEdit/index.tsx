import { Form } from '@/components/form'
import useForm from '@/hooks/useForm'
import Modal from '@/components/modal/Modal'
import { isNotEmpty, validateField } from '@/utils/validations'
import TextField from '@/components/textField/TextField'
import React from 'react'
import { GroupForm, GroupProps } from '@/utils/interfaces/group'
import { MeasurementUnitContract } from '../MeasurementForm/types'

export default function MeasurementUnitEdit({
  group,
  loading,
  isOpen,
  handleSave,
  handleCloseModal,
}: MeasurementUnitContract) {
  const { form, handleSetState } = useForm(group as GroupProps)
  const [errors, setErrors] = React.useState<Partial<GroupForm>>({})
  const validateForm = () => {
    const newErrors: Partial<Record<string, string>> = {
      name: validateField('Nome', form.name, isNotEmpty),
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
      await handleSave({
        id: form.id,
        name: form.name.toUpperCase(),
      } as GroupProps)
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
            await handleUpdate()
          }
        }}
        loading={loading}
        text="ATUALIZAR"
      >
        <TextField
          label="Nome"
          name="name"
          value={form.name}
          onChange={handleSetState}
          errors={errors.name!}
        />
      </Form>
    </Modal>
  )
}
