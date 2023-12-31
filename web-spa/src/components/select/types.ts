import { FormInputEvent } from '@/hooks/useForm'

export interface SelectInput {
  id: string
  name: string
}

export interface SelectProps {
  key?: string
  name?: string
  errors: string | number
  placeholder?: string
  color?: string
  width?: string
  data: any[]
  value?: string
  defaultValue?: string
  onClick: (e: FormInputEvent) => void
  disabled?: boolean
}
