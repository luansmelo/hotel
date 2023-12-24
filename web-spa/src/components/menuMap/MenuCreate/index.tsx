import { Form } from '@/components/form'
import useForm from '@/hooks/useForm'
import Modal from '@/components/Modal/modal/Modal'
import { MenuMapProps } from '../types'
import TextField from '@/components/TextField/TextField'

export default function MenuCreate({
  loading,
  isOpenModel,

  closeModal,
  handleSave,
}: MenuMapProps) {
  const { form, handleSetState } = useForm({
    name: '',
  })

  const handleModalClose = () => {
    closeModal()
  }

  const createInput = async () => {
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

          await createInput()
        }}
        loading={loading}
        text="CRIAR"
      >
        <TextField
          name="name"
          value={form.name}
          onChange={handleSetState}
          label="nome"
          height="70px"
        />
      </Form>
    </Modal>
  )
}
