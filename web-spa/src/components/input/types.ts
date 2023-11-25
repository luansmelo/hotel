import { InputContract } from '@/atom/business'
import { InputErrors } from '@/context/input'

export interface Input {
  id: string
  name: string
  measurementUnit: string
  unitPrice: number
  code: string
  group: string
}

export interface InputListProps {
  loading: boolean
  inputList: Input[]
  handleDelete: (id: string) => void
  handleSelectInput: (data: Input) => void
  openEditModal: () => void
}

export interface InputFormProps {
  children: React.ReactNode
  loading: boolean
  submit: (e: React.FormEvent<HTMLFormElement>) => void
  errors?: Record<string, string | number>
  text: string
}

export interface InputProps {
  loading: boolean
  errors: Record<string, string | number>
  setErrors: React.Dispatch<React.SetStateAction<Partial<InputErrors>>>
  handleSave: (input: InputContract) => Promise<void>
  showModal: boolean
  handleCloseModal: () => void
  inputList?: Input[]
  input?: Input
}
