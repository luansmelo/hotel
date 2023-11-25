'use client'

import { LoginForm } from '@/components/auth/LoginForm/LoginForm'
import { AuthContext } from '@/context/auth'
import { useContext } from 'react'
export default function Login() {
  const { signIn, loading } = useContext(AuthContext)

  return <LoginForm signIn={signIn} loading={loading} />
}
