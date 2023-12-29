import { InputContract } from '@/atom/business'
import { InputErrors } from '@/context/input'
import { MeasurementUnitContract } from './MeasurementUnit/types'

export interface InputToProductProps {
  id: string
  name: string
  measurementUnit: string
  grammage: number
}

export interface Input {
  id: string
  name: string
  measurementUnit: string
  unitPrice: number
  code: string
  group: string
  grammage?: number
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
  showModal: boolean
  errors: Record<string, string | number>
  inputList?: Input[]
  measurementUnitList?: MeasurementUnitContract[]
  input?: Input
  setErrors: React.Dispatch<React.SetStateAction<Partial<InputErrors>>>
  handleSave: (input: InputContract) => Promise<void>
  handleCloseModal: () => void
}
