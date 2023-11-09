import { useState } from 'react'
import styles from './styles.module.scss'
import { handleToastify } from '@/utils/toastify'
import { FEATURES, useAppContext } from '@/context/AppContext'
import {
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import AddButton from '@/components/addButton'
import api from '@/config/configApi'

export default function RegisterFeature() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { setCurrentFeature, setUser } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)

  const isButtonDisabled =
    password !== confirmPassword ||
    !name.length ||
    !email.length ||
    !password.length

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleRequest = async () => {
    try {
      setIsLoading(true)
      const response = await api.post('/account/create', {
        name,
        email,
        password,
      })

      if (response.status === 201) {
        setTimeout(() => {
          handleToastify('Usuário cadastrado com sucesso!', 'success')
          setUser({ name: response.data.name, email: response.data.email })
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('email', response.data.email)
          setCurrentFeature(FEATURES.MENU_MAP)
        }, 2000)
      } else {
        setTimeout(() => {
          handleToastify('Erro ao criar a conta', 'error')
        }, 2000)
      }
    } catch (error) {
      // Tratar erros
      console.error('Ocorreu um erro:', error)
      handleToastify('Ocorreu um erro ao criar a conta.', 'error')
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <Fade in={true} timeout={750}>
        <div className={styles.CardloginWrapper}>
          <div className={styles.createNewAccountInputsWrapper}>
            <div style={{ position: 'relative' }}>
              <IconButton
                style={{ position: 'absolute', left: '150px', bottom: '-10px' }}
                color="primary"
                aria-label="Voltar"
                onClick={() => setCurrentFeature(FEATURES.LOGIN)}
              >
                <ArrowLeft color="#84A59D" />
              </IconButton>
            </div>
            <TextField
              id="Nome"
              label="Nome"
              variant="outlined"
              sx={{
                width: '380px',
              }}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <TextField
              id="Email"
              label="Email"
              variant="outlined"
              error={email.length > 0 && !isValidEmail(email)}
              helperText={
                email.length > 0 && !isValidEmail(email)
                  ? 'E-mail inválido.'
                  : ''
              }
              sx={{
                width: '380px',
              }}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <FormControl
              sx={{
                width: '380px',
              }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Senha
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                sx={{
                  width: '380px',
                }}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                error={password.length > 0 && password !== confirmPassword}
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
                label="Password"
              />
            </FormControl>

            <FormControl
              sx={{
                width: '380px',
              }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-confirm-password">
                Confirmar Senha
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={showPassword ? 'text' : 'password'}
                sx={{
                  width: '380px',
                }}
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

            <span className={styles.createNewAccountButtonWrapper}>
              <AddButton
                text="Criar Nova Conta"
                onClickButton={handleRequest}
                isButtonDisabled={isButtonDisabled}
                isLoading={isLoading}
                // onClickButton={() => setCurrentFeature(FEATURES.PRODUCTION_MAP)}
              />
            </span>
          </div>
        </div>
      </Fade>
    </div>
  )
}
