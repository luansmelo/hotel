export interface InputProps {
  id: string
  name: string
  measurementUnit: string
  unitPrice: number
  code: string
  group: string
}

export interface InputListProps {
  loading: boolean
  inputList: InputProps[]
  handleDelete: (id: string) => void
  handleSelectInput: (data: InputProps) => void
  openEditModal: () => void
}
