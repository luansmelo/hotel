import { InputErrors } from '@/context/input'
import { CategoryProps } from '@/utils/interfaces/category'

export interface MenuMapProps {
  loading: boolean
  errors: Record<string, string | number>
  setErrors: React.Dispatch<React.SetStateAction<Partial<InputErrors>>>
  handleSave: (input: CategoryProps) => Promise<void>
  closeModal: () => void
  isOpenModel: boolean
}
