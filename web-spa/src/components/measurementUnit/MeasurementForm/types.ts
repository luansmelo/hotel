export interface Error {
  [key: string]: string
}

export interface MeasurementForm {
  name: string
}

export interface MeasurementProps {
  id: string
  name: string
}

export interface MeasurementUnitContract {
  group?: MeasurementForm
  isOpen: boolean
  loading: boolean
  handleSave: (input: MeasurementProps) => Promise<void>
  handleCloseModal: () => void
}
