'use client'

import { createContext, ReactNode } from 'react'
import { AuthService, UserLogin } from '@/services/auth/auth'
import { useRouter } from 'next/navigation'
import cookies from 'js-cookie'

interface AuthContextType {
  signIn: (input: UserLogin) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  async function signIn(input: UserLogin) {
    try {
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
      }
    } catch (error) {
      console.log(error)
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
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
