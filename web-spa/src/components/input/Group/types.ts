import { GroupProps } from '@/utils/interfaces/group'

export interface Error {
  [key: string]: string
}

export interface InputFormProps {
  children: React.ReactNode
  loading: boolean
  submit: (e: React.FormEvent<HTMLFormElement>) => void
  text: string
}

export interface GroupPropsContract {
  isOpen: boolean
  loading: boolean
  handleSave: (input: GroupProps) => Promise<void>
  handleCloseModal: () => void
}
