import { InputContract } from '@/atom/business'
import { Error, MeasurementUnitContract } from './MeasurementUnit/types'
import { GroupProps } from '@/utils/interfaces/group'

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
  groupList?: GroupProps[]
  measurementUnitList?: MeasurementUnitContract[]
  input?: Input
  setErrors: React.Dispatch<React.SetStateAction<Partial<Error>>>
  handleSave: (input: InputContract) => Promise<void>
  handleCloseModal: () => void
}
