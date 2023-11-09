import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

interface IBusinessContext {
  menuList: string[]
  currentMenu: string
  setCurrentMenu: React.Dispatch<React.SetStateAction<string>>
  setMenuList: React.Dispatch<React.SetStateAction<string[]>>
  fetchMenuList: () => Promise<void>
}

const BusinessContext = createContext<IBusinessContext | null>(null)

export const BusinessProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [menuList, setMenuList] = useState<string[]>([])
  const [currentMenu, setCurrentMenu] = useState<string>('')

  const fetchMenuList = async () => {
    try {
      const response = await fetch(
        'https://localhost:8080/api/menu/getMenuList'
      )
      if (!response.ok) {
        throw new Error('Erro ao obter a lista de menus.')
      }
      const data = await response.json()
      console.log('response', data)
      const menuNames = data.menuList.map((menu: any) => menu.name)
      setMenuList(menuNames)
    } catch (error) {
      setMenuList([])
    }
  }

  useEffect(() => {
    if (!menuList.length) {
      fetchMenuList()
    }
  }, [menuList.length])

  console.log('menuList provider', menuList)
  const contextValue: IBusinessContext = {
    menuList,
    currentMenu,
    setCurrentMenu,
    setMenuList,
    fetchMenuList,
  }

  return (
    <BusinessContext.Provider value={contextValue}>
      {children}
    </BusinessContext.Provider>
  )
}

export const useBusinessContext = () => {
  const context = useContext(BusinessContext)
  if (!context) {
    throw new Error(
      'useBusinessContext deve ser usado dentro de um BusinessProvider'
    )
  }
  return context
}
