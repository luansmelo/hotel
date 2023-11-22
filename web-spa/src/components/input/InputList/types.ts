import { InputContract } from '@/atom/business'

export interface InputProps {
  id: string
  name: string
  measurementUnit: string
  unitPrice: number
  code: string
  group: string
}

export interface InputListProps {
  inputList: InputProps[]
  handleDelete: (id: string) => void
  handleEdit?: (data: InputContract) => void
}
