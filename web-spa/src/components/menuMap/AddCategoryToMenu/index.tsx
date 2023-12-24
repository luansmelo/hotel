import Modal from '@/components/Modal/modal/Modal'
import { MenuMapProps } from '../types'
import { MenuCategoryProps } from '@/utils/interfaces/menu'

export default function AddCategoryToMenu({
  isOpenModel,

  closeModal,
  handleProductAddCategory,
}: MenuMapProps) {
  const handleModalClose = () => {
    closeModal()
  }

  const addCategory = async (input: MenuCategoryProps) => {
    try {
      if (handleProductAddCategory) {
        await handleProductAddCategory(input)
      }
    } catch (error) {
      console.log(error)
    } finally {
      handleModalClose()
    }
  }

  return (
    <Modal open={isOpenModel} onClose={closeModal}>
      <div>
        <h1>Olá Mundo</h1>
      </div>
    </Modal>
  )
}
