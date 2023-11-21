import { InputProps } from '@/components/input/InputList/types'

export interface InputItemProps {
  input: InputProps
  handleDelete: (id: string) => void
}
