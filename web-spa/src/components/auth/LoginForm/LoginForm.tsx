'use client'
import { AuthForm } from '@/components/auth/AuthForm/AuthForm'
import { useContext, useState } from 'react'
import { TextField } from '@mui/material'
import { AuthContext } from '@/context/auth'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn } = useContext(AuthContext)

  const handleLogin = async () => {
    setLoading(true)

    await signIn({
      email,
      password,
    })
  }

  return (
    <AuthForm
      forgotPassword={true}
      loading={loading}
      submit={async (e) => {
        e.preventDefault()
        setLoading(true)
        await handleLogin()
      }}
    >
      <TextField
        fullWidth
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />
      <TextField
        fullWidth
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
    </AuthForm>
  )
}
