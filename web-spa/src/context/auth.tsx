'use client'

import React, { createContext, useState, ReactNode } from 'react'
import { AuthService, UserLogin } from '@/services/auth/auth'
import { useRouter } from 'next/navigation'
import cookies from 'js-cookie'

interface User {
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  signIn: (input: UserLogin) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  async function signIn(input: UserLogin) {
    try {
      const response = new AuthService()

      const user = await response.login(input)

      if (user?.ok) {
        const data = await user.json()

        cookies.set('at', data.access_token, {
          expires: 60 * 60 * 24 * 7,
        })

        setUser(data.user)

        router.push('/kitchen')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function signOut() {
    cookies.remove('at')
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
