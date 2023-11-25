'use client'
import { RegisterForm } from '@/components/auth/RegisterForm/RegisterForm'
import { AuthContext } from '@/context/auth'
import { useContext } from 'react'

export default function Register() {
  const { signUp, loading } = useContext(AuthContext)

  return <RegisterForm register={signUp} loading={loading} />
}
