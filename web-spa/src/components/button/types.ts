import { LucideIcon } from 'lucide-react'

export interface ButtonProps {
  text: string
  disabled?: boolean
  Icon?: LucideIcon
  loading?: boolean
  color?: string
  height?: string | number
  width?: string | number
  onSubmit?: () => void
}
