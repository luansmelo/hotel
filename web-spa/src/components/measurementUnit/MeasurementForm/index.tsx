import { Form } from '@/components/form'
import useForm from '@/hooks/useForm'
import Modal from '@/components/modal/Modal'
import TextField from '@/components/textField/TextField'
import Separator from '@/components/separator'
import styles from './styles.module.scss'
import { isNotEmpty, validateField } from '@/utils/validations'
import React from 'react'
import { MeasurementProps, MeasurementUnitContract } from './types'

export default function MeasurementForm({
  loading,
  isOpen,
  handleSave,
  handleCloseModal,
}: MeasurementUnitContract) {
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
    handleCloseModal()
  }

  const createMeasurement = async () => {
    try {
      await handleSave({
        name: form.name.toUpperCase(),
      } as MeasurementProps)
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
            await createMeasurement()
          }
        }}
        loading={loading}
        text="CRIAR"
      >
        <p className={styles.paragraph}>Unidade de medida</p>

        <Separator />

        <TextField
          height="70px"
          value={form.name}
          label="Nome"
          name="name"
          onChange={handleSetState}
          errors={errors.name!}
        />
      </Form>
    </Modal>
  )
}
