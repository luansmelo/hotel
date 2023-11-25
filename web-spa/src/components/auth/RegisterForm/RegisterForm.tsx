import { AuthForm } from '@/components/auth/AuthForm/AuthForm'

import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import useForm from '@/hooks/useForm'
import { Error } from '@/utils/interface'
import { RegisterFormProps, RegisterProps } from '../AuthForm/types'
export const RegisterForm = ({ register, loading }: RegisterFormProps) => {
  const { form, handleSetState } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [localError, setLocalError] = useState<Error<RegisterProps>>({
    errors: {},
    setErrors: () => {},
  })

  const validateForm = () => {
    const newErrors: Partial<RegisterProps> = {
      name: !form.name ? 'O nome é obrigatório.' : '',
      email: !form.email
        ? 'O email é obrigatório.'
        : !/\S+@\S+\.\S+/.test(form.email)
        ? 'Digite um email válido.'
        : '',
      password: !form.password
        ? 'A senha é obrigatória.'
        : form.password.length < 6
        ? 'A senha deve ter pelo menos 6 caracteres.'
        : '',
      confirmPassword: !form.confirmPassword
        ? 'A confirmação da senha é obrigatória.'
        : form.confirmPassword !== form.password
        ? 'As senhas não conferem.'
        : '',
    }

    setLocalError({
      ...localError,
      errors: newErrors,
    })

    return Object.values(newErrors).every((error) => !error)
  }

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  })

  const handleClickShowPassword = (field: 'password' | 'confirmPassword') => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleRegisterSubmit = async () => {
    if (validateForm()) {
      await register(form)
    }
  }
  return (
    <AuthForm
      forgotPassword={false}
      register
      loading={loading}
      submit={async (e) => {
        e.preventDefault()
        await handleRegisterSubmit()
      }}
    >
      <TextField
        autoComplete="off"
        fullWidth
        type="text"
        name="name"
        value={form.name}
        label="Nome"
        sx={{
          minheight: '70px',
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
        error={Boolean(localError?.errors?.name)}
        helperText={localError?.errors?.name}
      />

      <TextField
        fullWidth
        type="email"
        name="email"
        label="Email"
        value={form.email}
        sx={{
          minheight: '70px',
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
      <FormControl variant="outlined" fullWidth sx={{ height: '70px' }}>
        <InputLabel
          htmlFor="outlined-adornment-password"
          style={{ color: '#BDBDBD' }}
        >
          Senha
        </InputLabel>
        <OutlinedInput
          sx={{
            background: '#1F2128',
            color: '#BDBDBD',
            outline: 'none',
            margin: 0,
          }}
          id="outlined-adornment-password"
          type={showPassword.password ? 'text' : 'password'}
          name="password"
          value={form.password}
          onChange={handleSetState}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword('password')}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword.password ? (
                  <EyeOff color="#0488A6" />
                ) : (
                  <Eye color="#0488A6" />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="Senha"
        />
        <FormHelperText error={Boolean(localError?.errors?.password)}>
          {localError?.errors?.password}
        </FormHelperText>
      </FormControl>

      <FormControl variant="outlined" fullWidth sx={{ height: '70px' }}>
        <InputLabel
          htmlFor="outlined-adornment-confirm-password"
          style={{ color: '#BDBDBD' }}
        >
          Confirmar Senha
        </InputLabel>
        <OutlinedInput
          sx={{
            background: '#1F2128',
            color: '#BDBDBD',
            outline: 'none',
            margin: 0,
          }}
          id="outlined-adornment-confirm-password"
          type={showPassword.confirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={form.confirmPassword}
          error={Boolean(localError?.errors?.confirmPassword)}
          onChange={handleSetState}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword('confirmPassword')}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword.confirmPassword ? (
                  <EyeOff color="#0488A6" />
                ) : (
                  <Eye color="#0488A6" />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="Confirmar Senha"
        />
        <FormHelperText error={Boolean(localError?.errors?.confirmPassword)}>
          {localError?.errors?.confirmPassword}
        </FormHelperText>
      </FormControl>
    </AuthForm>
  )
}
