import { ChangeEvent } from 'react'

export interface ITextFieldProps {
  label: string
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
}
