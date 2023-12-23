'use client'

import { MenuService } from '@/services/menu'
import { MenuProps } from '@/utils/interfaces/menu'
import { handleToastify } from '@/utils/toastify'
import React, { createContext, useState, ReactNode, useEffect } from 'react'

interface MenuContract {
  loading: boolean
  menuList: string[]
  handleSave: (menu: MenuProps) => Promise<void>
  fetchMenuList: () => Promise<void>
}
export const MenuContext = createContext<MenuContract>({} as MenuContract)
export const MenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [menuList, setMenuList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const currentMenuId = dataMenu?.find((menu) => menu.name == currentMenu)?.id
  //   setCurrentMenuId(currentMenuId || '')
  // }, [currentMenu, dataMenu])

  const menu = new MenuService()

  const fetchMenuList = async () => {
    setLoading(true)
    try {
      const response = await menu.list()

      setMenuList(response || [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (input: MenuProps) => {
    try {
      const response = await menu.handle(input)

      if (response?.ok) {
        handleToastify('Menu criado com sucesso!', 'success')
      }
    } catch (error) {
      console.log(error)
    } finally {
      fetchMenuList()
    }
  }

  useEffect(() => {
    fetchMenuList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MenuContext.Provider
      value={{
        loading,
        menuList,
        handleSave,
        fetchMenuList,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}
