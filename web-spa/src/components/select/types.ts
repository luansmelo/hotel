import { FormInputEvent } from '@/hooks/useForm'

export interface SelectProps {
  key?: string
  name?: string
  color?: string
  width?: string
  data: any[]
  value: string
  onClick: (e: FormInputEvent) => void
  disabled?: boolean
}
