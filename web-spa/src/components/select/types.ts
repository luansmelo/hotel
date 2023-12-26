export interface SelectProps {
  color?: string
  data: any[]
  value: string
  onClick: (value: string) => void
  disabled?: boolean
}
