'use client'

import { IProductInputDataResponse } from '@/atom/business'
import { MenuService } from '@/services/menu'
import {
  MenuCategoryProps,
  MenuCreateProps,
  MenuProps,
  MenuToCategoryProps,
} from '@/utils/interfaces/menu'
import { handleToastify } from '@/utils/toastify'
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from 'react'

interface MenuContract {
  loading: boolean
  menuList: MenuProps[]
  menuProductList: IProductInputDataResponse[]
  handleSave: (menu: MenuCreateProps) => Promise<void>
  setMenuProductList: React.Dispatch<
    React.SetStateAction<IProductInputDataResponse[]>
  >
  fetchMenuProducts: (input: MenuCategoryProps) => Promise<void>
  handleAddCategoryToMenu: (input: MenuToCategoryProps) => Promise<void>
  fetchMenuList: () => Promise<void>
}
export const MenuContext = createContext<MenuContract>({} as MenuContract)
export const MenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [menuList, setMenuList] = useState<MenuProps[]>([])
  const [loading, setLoading] = useState(false)
  const [menuProductList, setMenuProductList] = useState<
    IProductInputDataResponse[]
  >([])

  const menu = useMemo(() => new MenuService(), [])

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

  const fetchMenuProducts = useCallback(
    async (input: MenuCategoryProps) => {
      try {
        setLoading(true)
        const response = await menu.getMenu(input)

        setMenuProductList(response)
      } catch (error) {
        console.error('Erro ao obter produtos do menu:', error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    },
    [menu, setMenuProductList, setLoading]
  )

  const handleSave = async (input: MenuCreateProps) => {
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

  const handleAddCategoryToMenu = async (input: MenuToCategoryProps) => {
    try {
      const response = await menu.addCategoryToMenu(input)

      if (response?.ok) {
        handleToastify('Categoria adicionada ao menu com sucesso!', 'success')
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
        menuProductList,
        setMenuProductList,
        fetchMenuProducts,
        handleSave,
        handleAddCategoryToMenu,
        fetchMenuList,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}
