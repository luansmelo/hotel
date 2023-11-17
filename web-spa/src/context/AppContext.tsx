'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { AuthService, UserLogin } from '@/services/auth/auth'
import { useRouter } from 'next/navigation'
import cookies from 'js-cookie'

interface User {
  name: string
  email: string
}

interface AppContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  signIn: (input: UserLogin) => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
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

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        signIn,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider')
  }
  return context
}
