'use client'

import { CategoryService } from '@/services/category'
import { CategoryProps, ProductOnCategory } from '@/utils/interfaces/category'
import { handleToastify } from '@/utils/toastify'
import React, { createContext, useState, ReactNode, useEffect } from 'react'

interface CategoryContract {
  loading: boolean
  categoryList: CategoryProps[]
  handleCreateCategory: (input: CategoryProps) => Promise<void>
  handleDelete: (input: string) => Promise<void>
  handleUpdate: (input: CategoryProps) => Promise<void>
  handleProductAddCategory: (input: ProductOnCategory) => Promise<void>
  fetchCategoryList: () => Promise<void>
}
export const CategoryContext = createContext<CategoryContract>(
  {} as CategoryContract
)
export const CategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categoryList, setCategoryList] = useState<CategoryProps[]>([])
  const [loading, setLoading] = useState(true)

  const category = new CategoryService()

  const fetchCategoryList = async () => {
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
      setLoading(false)
      fetchCategoryList()
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await category.delete(id)

      if (response?.message === 'sucesso') {
        handleToastify('Categoria removida com sucesso!', 'success')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      fetchCategoryList()
    }
  }

  const handleUpdate = async (input: CategoryProps) => {
    try {
      const response = await category.update(input)

      if (response?.message === 'sucesso') {
        handleToastify('Categoria atualizada com sucesso!', 'success')
      }
    } catch (error) {
      console.log(error)
    } finally {
      fetchCategoryList()
      setLoading(false)
    }
  }

  const handleProductAddCategory = async (input: ProductOnCategory) => {
    try {
      const response = await category.addProduct(input)

      if (response?.ok) {
        handleToastify('Produto adicionado com sucesso!', 'success')
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
        handleDelete,
        handleUpdate,
        handleProductAddCategory,

        fetchCategoryList,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
