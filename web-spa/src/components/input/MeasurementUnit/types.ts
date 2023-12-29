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
  errors?: Record<string, string | number>
  text: string
}

export interface MeasurementUnitProps {
  isOpen: boolean
  loading: boolean
  errors: Record<string, string | number>
  setErrors: React.Dispatch<React.SetStateAction<Partial<Error>>>
  handleSave: (input: MeasurementUnitContract) => Promise<void>
  handleCloseModal: () => void
}
