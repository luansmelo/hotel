'use client'

import { createContext, ReactNode, useState } from 'react'
import { AuthService, UserLogin } from '@/services/auth/auth'
import { useRouter } from 'next/navigation'
import cookies from 'js-cookie'
import { Input } from '@/components/input/types'
import { InputErrors } from './input'
import { handleToastify } from '@/utils/toastify'

export interface AuthError {
  errors: Partial<Input>
  setErrors: React.Dispatch<React.SetStateAction<Partial<InputErrors>>>
}
interface AuthContextType {
  loading: boolean
  signIn: (input: UserLogin) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function signIn(input: UserLogin) {
    try {
      setLoading(true)
      const response = new AuthService()

      const user = await response.login(input)

      if (user?.ok) {
        const data = await user.json()

        cookies.set('user', JSON.stringify(data.user), {
          expires: 60 * 60 * 24 * 7,
        })

        cookies.set('at', data.access_token, {
          expires: 60 * 60 * 24 * 7,
        })

        router.push('/kitchen')
      } else {
        const error = await user?.json()
        handleToastify(error.error, 'error')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }

  async function signOut() {
    cookies.remove('at')
    cookies.remove('user')
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        loading,

        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
