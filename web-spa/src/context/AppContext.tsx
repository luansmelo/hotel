import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import jwt from 'jsonwebtoken'

export enum FEATURES {
  LOGIN,
  REGISTER,
  CREATE_PRODUCT,
  PRODUCTS,
  PRODUCT_DETAILS,
  INPUTS,
  PRODUCTION_MAP,
  MENU_MAP,
}

interface AppContextType {
  currentFeature: FEATURES
  setCurrentFeature: React.Dispatch<React.SetStateAction<FEATURES>>
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setToken: React.Dispatch<React.SetStateAction<string | null>>
  token: string | null
}

interface User {
  name: string
  email: string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentFeature, setCurrentFeature] = useState(FEATURES.LOGIN)
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userName = localStorage.getItem('userName')
    const userEmail = localStorage.getItem('userEmail')

    if (userName && userEmail) setUser({ name: userName, email: userEmail })

    if (token) {
      try {
        const decodedToken = jwt.decode(token) as string
        console.log('decodedToken', decodedToken)
        setToken(decodedToken)

        setCurrentFeature(FEATURES.MENU_MAP)
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        localStorage.removeItem('userEmail')
      }
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        currentFeature,
        setCurrentFeature,
        user,
        setUser,
        token,
        setToken,
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
