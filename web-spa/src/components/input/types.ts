import { InputContract } from '@/atom/business'
import { MeasurementUnitContract } from './MeasurementUnit/types'
import { GroupProps } from '@/utils/interfaces/group'
import { Action } from '../listItem/types'

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

export interface InputListProps<T> {
  loading: boolean
  itemList: Input[]
  headers: string[]
  actions: Action<T>[]
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
  inputList?: Input[]
  groupList?: GroupProps[]
  measurementUnitList?: MeasurementUnitContract[]
  input?: Input
  handleSave: (input: InputContract) => Promise<void>
  handleCloseModal: () => void
}
