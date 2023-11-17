import { useState } from 'react'
import Image from 'next/image'

import { FEATURES, useAppContext } from '@/context/AppContext'
import styles from './styles.module.scss'
import AddButton from '@/components/addButton'
import {
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { handleToastify } from '@/utils/toastify'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('tester@tester.com')
  const [password, setPassword] = useState('tester123')
  const [isLoading, setIsLoading] = useState(false)

  const { setCurrentFeature, setUser, setToken } = useAppContext()

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
      const URL_API_POST_NEW_USER = 'https://localhost:7196/api/user/postLogin'
      const response = await fetch(URL_API_POST_NEW_USER, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setTimeout(() => {
          handleToastify('Login realizado com sucesso!', 'success')
          setUser({ name: data.name, email })
          localStorage.setItem('token', data.token)
          localStorage.setItem('userName', data.userName)
          localStorage.setItem('userEmail', data.userEmail)
          setCurrentFeature(FEATURES.MENU_MAP)
        }, 2000)
      } else {
        const errorData = await response.json()
        setTimeout(() => {
          handleToastify(errorData.message, 'error')
        }, 2000)
      }
    } catch {
      handleToastify('Não foi possível se conectar.', 'error')
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
          <div className={styles.logo}>
            <Image src="/chef-hat.png" alt="" width={110} height={110} />

            <p>App</p>
            <span />
          </div>
          <div className={styles.loginContent}>
            <div className={styles.inputsContainer}>
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

              <div className={styles.createNewAccount}>
                <span />
                <button onClick={() => setCurrentFeature(FEATURES.REGISTER)}>
                  Criar Nova Conta
                </button>
                <span />
              </div>

              <AddButton
                text="LOGIN"
                Icon={LogIn}
                onClickButton={() => handleRequest()}
                isLoading={isLoading}
                isButtonDisabled={isLoading}
              />
            </div>
          </div>
        </div>
      </Fade>
    </div>
  )
}
