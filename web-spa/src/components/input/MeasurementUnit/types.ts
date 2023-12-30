export interface Error {
  [key: string]: string
}

export interface MeasurementUnitContract {
  id?: string
  name: string
}

export interface InputFormProps {
  children: React.ReactNode
  loading: boolean
  submit: (e: React.FormEvent<HTMLFormElement>) => void
  text: string
}

export interface MeasurementUnitProps {
  isOpen: boolean
  loading: boolean
  handleSave: (input: MeasurementUnitContract) => Promise<void>
  handleCloseModal: () => void
}
