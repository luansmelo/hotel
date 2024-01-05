'use client'

import { Menu } from '@/app/(authenticated)/kitchen/menu/page'
import { CategoryService } from '@/services/category'
import { MenuService } from '@/services/menu'
import { RemoveProduct } from '@/utils/interfaces/category'
import {
  MenuCategoryProps,
  MenuCreateProps,
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
  menuList: Menu[]
  menuProductList: MenuCategoryProps
  handleSave: (menu: MenuCreateProps) => Promise<void>
  setMenuProductList: React.Dispatch<React.SetStateAction<MenuCategoryProps>>
  fetchMenuProducts: (input: MenuCategoryProps) => Promise<void>
  handleAddCategoryToMenu: (input: MenuToCategoryProps[]) => Promise<void>
  handleRemoveProduct: (input: RemoveProduct) => Promise<void>
  fetchMenuList: () => Promise<void>
}
export const MenuContext = createContext<MenuContract>({} as MenuContract)
export const MenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [menuList, setMenuList] = useState<Menu[]>([])
  const [loading, setLoading] = useState(false)
  const [menuProductList, setMenuProductList] = useState<MenuCategoryProps>(
    {} as MenuCategoryProps
  )

  const category = useMemo(() => new CategoryService(), [])
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
        }, 1000)
      }
    },
    [menu, setMenuProductList]
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

  const handleAddCategoryToMenu = async (input: MenuToCategoryProps[]) => {
    try {
      setLoading(true)
      const response = await menu.addCategoryToMenu(input)

      if (response?.ok) {
        handleToastify('Categoria adicionada ao menu com sucesso!', 'success')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveProduct = async (input: RemoveProduct) => {
    setLoading(true)
    try {
      const response = await category.removeProduct(input)
      if (response?.message === 'sucesso') {
        handleToastify('Produto removido com sucesso!', 'success')
      }
    } catch (error) {
      console.log(error)
      setMenuProductList({} as MenuCategoryProps)
    } finally {
      try {
        await fetchMenuProducts({
          categoryId: input.categoryId!,
          menuId: input.menuId,
          weekDay: input.weekDay,
        })
      } finally {
        setLoading(false)
      }
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
        handleRemoveProduct,
        fetchMenuList,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}
