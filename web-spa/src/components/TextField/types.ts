import { ChangeEvent } from 'react'

export interface ITextFieldProps {
  name: string
  label: string
  multiline?: boolean
  rows?: number
  defaultValue?: string
  placeholder?: string
  value?: string
  type?: string
  height?: string
  width?: string | number
  errors: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
