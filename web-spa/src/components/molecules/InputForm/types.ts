export interface IInputFormProps {
  children: React.ReactNode
  loading: boolean
  submit: (e: React.FormEvent<HTMLFormElement>) => void
}
