export interface LoginProps {
  email: string
  password: string
}

export interface RegisterProps {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  forgotPassword: boolean
  register?: boolean
  loading?: boolean
  submit: (e: React.FormEvent<HTMLFormElement>) => void
}

export interface LoginFormProps {
  signIn: (input: LoginProps) => Promise<void>
  loading: boolean
}

export interface RegisterFormProps {
  register: (input: RegisterProps) => Promise<void>
  loading: boolean
}
