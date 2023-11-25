import { AuthForm } from '@/components/auth/AuthForm/AuthForm'
import { TextField } from '@mui/material'
import useForm from '@/hooks/useForm'
import { LoginFormProps, LoginProps } from '../AuthForm/types'
import { Error } from '@/utils/interface'
import { useState } from 'react'

export const LoginForm = ({ signIn, loading }: LoginFormProps) => {
  const { form, handleSetState } = useForm({
    email: '',
    password: '',
  })

  const [localError, setLocalError] = useState<Error<LoginProps>>({
    errors: {},
    setErrors: () => {},
  })

  const validateForm = () => {
    const newErrors: Partial<LoginProps> = {
      email: !form.email
        ? 'O email é obrigatório.'
        : !/\S+@\S+\.\S+/.test(form.email as string)
        ? 'Digite um email válido.'
        : '',
      password: !form.password
        ? 'A senha é obrigatória.'
        : form.password.length < 6
        ? 'A senha deve ter pelo menos 6 caracteres.'
        : '',
    }

    setLocalError({
      ...localError,
      errors: newErrors,
    })

    return Object.values(newErrors).every((error) => !error)
  }

  const handleLogin = async () => {
    if (validateForm()) {
      await signIn(form)
    }
  }

  return (
    <AuthForm
      forgotPassword={true}
      loading={loading}
      submit={async (e) => {
        e.preventDefault()
        await handleLogin()
      }}
    >
      <TextField
        autoComplete="off"
        fullWidth
        placeholder="Email"
        type="text"
        name="email"
        value={form.email}
        required
        sx={{
          minHeight: '70px',
        }}
        InputProps={{
          style: {
            background: '#1F2128',
            color: '#BDBDBD',
            outline: 'none',
            margin: 0,
          },
        }}
        InputLabelProps={{
          style: {
            color: '#BDBDBD',
          },
        }}
        onChange={handleSetState}
        error={Boolean(localError?.errors?.email)}
        helperText={localError?.errors?.email}
      />
      <TextField
        autoComplete="off"
        fullWidth
        placeholder="Password"
        type="password"
        name="password"
        value={form.password}
        sx={{
          minHeight: '70px',
        }}
        InputProps={{
          style: {
            background: '#1F2128',
            color: '#BDBDBD',
            outline: 'none',
            margin: 0,
          },
        }}
        InputLabelProps={{
          style: {
            color: '#BDBDBD',
          },
        }}
        onChange={handleSetState}
        error={Boolean(localError?.errors?.password)}
        helperText={localError?.errors?.password}
      />
    </AuthForm>
  )
}
