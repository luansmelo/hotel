import { TextField } from '@mui/material'
import { Form } from '@/components/form'
import useForm from '@/hooks/useForm'
import Modal from '@/components/modal/Modal'
import { Product } from '../types'
import { FileUp } from 'lucide-react'
import styles from './styles.module.scss'

export interface ProductProps {
  loading: boolean
  showModal: boolean
  errors: Record<string, string | number>
  setErrors: React.Dispatch<
    React.SetStateAction<Partial<Record<string, string | number>>>
  >
  handleSave: (input: Product) => Promise<void>
  handleCloseModal: () => void
}

export default function ProductCreate({
  loading,
  errors,
  showModal,
  setErrors,
  handleSave,
  handleCloseModal,
}: ProductProps) {
  const { form, handleSetState } = useForm({
    name: '',
    description: '',
  })

  const validateForm = () => {
    const newErrors = {
      name: form.name.trim() === '' ? 'Nome é obrigatório' : '',
    }

    setErrors(newErrors)

    return Object.values(newErrors).every((error) => error === '')
  }

  const handleModalClose = () => {
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
        errors={errors}
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

          <div className={styles.inputContainer}>
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
                minHeight: '60px',
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
              error={!!errors?.name}
              helperText={errors?.name}
            />

            <TextField
              size="small"
              name="description"
              label="Modo de Preparo"
              multiline
              rows={10}
              defaultValue="Escreva aqui uma descrição para seu produto..."
              fullWidth
              value={form.description}
              onChange={handleSetState}
              autoComplete="off"
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
            />
          </div>
        </div>
      </Form>
    </Modal>
  )
}
