'use client'

import { CategoryService } from '@/services/category'
import { CategoryProps } from '@/utils/interfaces/category'
import { MenuProps } from '@/utils/interfaces/menu'
import { handleToastify } from '@/utils/toastify'
import React, { createContext, useState, ReactNode, useEffect } from 'react'

interface CategoryContract {
  loading: boolean
  categoryList: string[]
  handleCreateCategory: (input: MenuProps) => Promise<void>

  fetchCategoryList: () => Promise<void>
}
export const CategoryContext = createContext<CategoryContract>(
  {} as CategoryContract
)
export const CategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const currentMenuId = dataMenu?.find((menu) => menu.name == currentMenu)?.id
  //   setCurrentMenuId(currentMenuId || '')
  // }, [currentMenu, dataMenu])

  const category = new CategoryService()

  const fetchCategoryList = async () => {
    setLoading(true)
    try {
      const response = await category.list()
      console.log(response)
      setCategoryList(response || [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCategory = async (input: CategoryProps) => {
    try {
      const response = await category.handle(input)

      if (response?.ok) {
        handleToastify('Categoria criada com sucesso!', 'success')
      }
    } catch (error) {
      console.log(error)
    } finally {
      fetchCategoryList()
    }
  }

  useEffect(() => {
    fetchCategoryList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CategoryContext.Provider
      value={{
        loading,
        categoryList,
        handleCreateCategory,
        fetchCategoryList,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
