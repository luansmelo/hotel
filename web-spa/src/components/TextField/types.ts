import { ChangeEvent } from 'react'

export interface ITextFieldProps {
  name: string
  label: string
  placeholder?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
  height?: string
}
