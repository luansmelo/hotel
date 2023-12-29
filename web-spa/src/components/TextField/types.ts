import { ChangeEvent } from 'react'

export interface ITextFieldProps {
  name: string
  label: string
  placeholder?: string
  value: string
  type?: string
  height?: string
  errors: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
