import { CategoryProps } from '@/utils/interfaces/category'

export interface MenuMapProps {
  loading: boolean
  handleSave: (input: CategoryProps) => Promise<void>
  closeModal: () => void
  isOpenModel: boolean
}
