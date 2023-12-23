import { InputErrors } from '@/context/input'
import { MenuProps } from '@/utils/interfaces/menu'

export interface MenuMapProps {
  loading: boolean
  errors: Record<string, string | number>
  setErrors: React.Dispatch<React.SetStateAction<Partial<InputErrors>>>
  handleSave: (input: MenuProps) => Promise<void>
  closeModal: () => void
  isOpenModel: boolean
}
