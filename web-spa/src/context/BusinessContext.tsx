'use client'

import { IMenuResponse } from '@/atom/business'
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
  currentMenuId: string
}

const BusinessContext = createContext<IBusinessContext | null>(null)

export const BusinessProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [menuList, setMenuList] = useState<string[]>([])
  const [dataMenu, setDataMenu] = useState<IMenuResponse[]>()
  const [currentMenu, setCurrentMenu] = useState<string>('')
  const [currentMenuId, setCurrentMenuId] = useState('')

  useEffect(() => {
    const currentMenuId = dataMenu?.find((menu) => menu.name == currentMenu)?.id
    setCurrentMenuId(currentMenuId || '')
  }, [currentMenu, dataMenu])

  const fetchMenuList = async () => {
    try {
      const response = await fetch(
        'https://localhost:7196/api/menu/getMenuList'
      )
      if (!response.ok) {
        throw new Error('Erro ao obter a lista de menus.')
      }
      const data = await response.json()
      const menuNames = data.menuList.map((menu: any) => menu.name)
      if (menuNames?.length > 0) {
        setMenuList(menuNames)
        setCurrentMenu(menuNames[0])
        setDataMenu(data.menuList)
      }
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
    currentMenuId,
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
