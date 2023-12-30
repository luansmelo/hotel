import { Form } from '@/components/form'
import useForm from '@/hooks/useForm'
import Modal from '@/components/modal/Modal'
import { ProductInputProps } from '../types'
import { FileUp } from 'lucide-react'
import styles from './styles.module.scss'
import React from 'react'
import TextField from '@/components/textField/TextField'

export interface ProductProps {
  loading: boolean
  showModal: boolean
  handleSave: (input: ProductInputProps) => Promise<void>
  handleCloseModal: () => void
}

export default function ProductCreate({
  loading,
  showModal,
  handleSave,
  handleCloseModal,
}: ProductProps) {
  const { form, handleSetState, clear } = useForm({
    name: '',
    description: '',
  })
  const [errors, setErrors] = React.useState<Partial<ProductInputProps>>({})
  const validateForm = () => {
    const newErrors: Partial<Record<string, string>> = {
      name: form.name.trim() === '' ? 'Nome é obrigatório' : '',
      description:
        form.description.trim() === '' ? 'Descricão é obrigatório' : '',
    }

    setErrors(newErrors)

    return Object.values(newErrors).every((error) => error === '')
  }

  const handleModalClose = () => {
    clear()
    setErrors({})
    handleCloseModal()
  }

  const create = async () => {
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
    <Modal open={showModal} onClose={handleModalClose}>
      <Form
        submit={async (e) => {
          e.preventDefault()
          if (validateForm()) {
            await create()
          }
        }}
        loading={loading}
        text="CRIAR"
      >
        <div className={styles.productContainer}>
          <div className={styles.uploadFileContainer}>
            <FileUp color="#2196F3" />

            <span className={styles.textWrapper}>
              <input id="uploadFile" type="file" />
              <label htmlFor="uploadFile" className={styles.labelUploadFile}>
                Click to upload
              </label>
              <p>or drag and drop</p>
            </span>
            <p>PNG, JPG (max. 2MB)</p>
          </div>

          <TextField
            label="Nome"
            name="name"
            value={form.name}
            onChange={handleSetState}
            errors={errors.name!}
          />

          <TextField
            label="Modo de Preparo"
            name="description"
            multiline
            rows={10}
            placeholder="Escreva aqui uma descrição para seu produto..."
            value={form.description}
            onChange={handleSetState}
            errors={errors.description!}
          />
        </div>
      </Form>
    </Modal>
  )
}
