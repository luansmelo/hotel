import { AuthForm } from '@/components/molecules/AuthForm/AuthForm'
import { AuthService, UserRegister } from '@/services/auth/auth'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
export const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const user = new AuthService()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleRegisterSubmit = async () => {
    if (!name || !email || !password) {
      setLoading(false)
      return
    }

    setLoading(true)

    const userData: UserRegister = {
      name,
      email,
      password,
    }

    try {
      const response = await user.register(userData)

      if (!response?.ok) {
        const data = await response?.json()
        setLoading(false)

        cookies.set('at', data.access_token, {
          expires: 60 * 60 * 24 * 7,
        })

        toast.success('Usuário criado com sucesso!')

        router.push('/kitchen')
      }
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <AuthForm
      forgotPassword={false}
      register
      submit={async (e) => {
        e.preventDefault()
        await handleRegisterSubmit()
      }}
      loading={loading}
    >
      <TextField
        fullWidth
        placeholder="Nome Completo"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />

      <TextField
        fullWidth
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </IconButton>
            </InputAdornment>
          }
          label="Senha"
        />
      </FormControl>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-confirm-password">
          Confirmar Senha
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-confirm-password"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          error={password.length > 0 && password !== confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirmar Senha"
        />
      </FormControl>
    </AuthForm>
  )
}
