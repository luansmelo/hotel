export interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  forgotPassword: boolean
  register?: boolean
  submit: (e: React.FormEvent<HTMLFormElement>) => void
  loading?: boolean
}
