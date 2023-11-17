'use client'
import { IProductInputDataResponse } from '@/atom/business'
import { DATE_TABS } from '@/components/DateTabs'
import { colorObj } from '@/feature/mapMenu/MenuMap'
import { handleToastify } from '@/utils/toastify'
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from 'react'

interface MenuMapProductInput {
  id: string
  productId: string
  inputId: string
  name: string
  code: string
  unitPrice: number
  quantityUnit: number
  measurementUnit: string
  grammage: number
}

interface MenuMapProduct {
  name: string
  productDescription: string
  id: string
}

interface MenuMapProduction {
  product: MenuMapProduct
  inputList: MenuMapProductInput[]
  productInputTotalPrice: number
}

interface ApiMenuMapProductionResponse {
  categoryTotalPrice: number
  productList: MenuMapProduction[]
}

interface IMapContext {
  currentSelectCategory: string
  setcurrentSelectCategory: React.Dispatch<React.SetStateAction<string>>
  // Defina os tipos de dados que deseja armazenar no contexto, se necessário.
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  currentDateTab: DATE_TABS
  setCurrentDateTab: React.Dispatch<React.SetStateAction<DATE_TABS>>
  fetchMenuProducts: (currentMenuId: string) => Promise<void>
  menuProductList: IProductInputDataResponse[]
  addProductToMenu: (productId: string, currentMenuId: string) => Promise<void>
  deleteProductFromMenu: (
    productId: string,
    currentMenuId: string
  ) => Promise<void>
}

const MapContext = createContext<IMapContext | null>(null)

export const categoryList = [
  'Café da Manhã',
  'Piscina',
  'Almoço',
  'Café da Tarde',
  'Janta',
  'Ceia',
]

export const MapProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentSelectCategory, setcurrentSelectCategory] = useState(
    categoryList[0]
  )
  const [isLoading, setIsLoading] = useState(false)
  const [currentDateTab, setCurrentDateTab] = useState(DATE_TABS.SUNDAY)
  const [menuProductList, setMenuProductList] = useState<
    IProductInputDataResponse[]
  >([])

  const fetchMenuProducts = useCallback(
    async (currentMenuId: string) => {
      try {
        const entries = Object.entries(colorObj)
        const selectedCategory = entries.findIndex(
          ([key]) => key === currentSelectCategory
        )

        setIsLoading(true)
        const endpoint = `https://localhost:7196/api/menu/getMenuProducts?SelectedMenu=${currentMenuId}&SelectedCategory=${selectedCategory}&SelectedDay=${currentDateTab}`
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            accept: '*/*',
          },
        })

        if (!response.ok) {
          throw new Error('Erro ao obter produtos do menu.')
        }

        const data = await response.json()
        setMenuProductList(data.productList)
      } catch (error) {
        console.error('Erro ao obter produtos do menu:', error)
        // Trate o erro conforme necessário
      } finally {
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    },
    [currentDateTab, currentSelectCategory]
  )

  const addProductToMenu = useCallback(
    async (productId: string, currentMenuId: string) => {
      try {
        console.log('currentDateTab', currentDateTab)
        const entries = Object.entries(colorObj)
        const selectedCategory = entries.findIndex(
          ([key]) => key === currentSelectCategory
        )

        const selectedMenu = currentMenuId

        setIsLoading(true)

        const endpoint = 'https://localhost:7196/api/menu/addProduct'
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            selectedMenu,
            selectedCategory,
            selectedDay: currentDateTab,
            productId,
          }),
        })

        if (!response.ok) {
          throw new Error('Erro ao adicionar produto ao menu.')
        }
        setTimeout(() => {
          handleToastify('Produto adicionado com sucesso!', 'success')
        }, 500)

        // Se necessário, você pode tratar a resposta do servidor
        const data = await response.json()
        console.log('Resposta do servidor:', data)

        // Atualize o estado ou faça outras operações conforme necessário
      } catch (error) {
        setTimeout(() => {
          handleToastify('Não foi possível adicionar novo produto.', 'error')
        }, 500)
        // Trate o erro conforme necessário
      } finally {
        fetchMenuProducts(currentMenuId)
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    },
    [currentDateTab, currentSelectCategory, fetchMenuProducts]
  )

  const deleteProductFromMenu = useCallback(
    async (productId: string, currentMenuId: string) => {
      try {
        const entries = Object.entries(colorObj)
        const selectedCategory = entries.findIndex(
          ([key]) => key === currentSelectCategory
        )

        const selectedMenu = currentMenuId

        setIsLoading(true)

        const endpoint = 'https://localhost:7196/api/menu/deleteProduct'
        const response = await fetch(endpoint, {
          method: 'DELETE',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            selectedMenu,
            selectedCategory,
            selectedDay: currentDateTab,
            productId,
          }),
        })

        if (!response.ok) {
          throw new Error('Erro ao deletar produto do menu.')
        }
        setTimeout(() => {
          handleToastify('Produto excluído com sucesso!', 'success')
        }, 500)

        // Se necessário, você pode tratar a resposta do servidor
        const data = await response.json()
        console.log('Resposta do servidor:', data)

        // Atualize o estado ou faça outras operações conforme necessário
      } catch (error) {
        setTimeout(() => {
          handleToastify('Não foi possível deletar o produto.', 'error')
        }, 500)
        // Trate o erro conforme necessário
      } finally {
        fetchMenuProducts(currentMenuId)
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    },
    [currentDateTab, currentSelectCategory, fetchMenuProducts]
  )

  return (
    <MapContext.Provider
      value={{
        currentSelectCategory,
        setcurrentSelectCategory,
        isLoading,
        setIsLoading,
        setCurrentDateTab,
        currentDateTab,
        fetchMenuProducts,
        menuProductList,
        addProductToMenu,
        deleteProductFromMenu,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export const useMapContext = () => {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMapContext deve ser usado dentro de um MapProvider')
  }
  return context
}
