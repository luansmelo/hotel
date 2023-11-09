import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
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
  const [productList, setProductList] = useState([])
  const [currentSelectCategory, setcurrentSelectCategory] = useState(
    categoryList[0]
  )
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Defina os valores dos parâmetros
    const selectedMenu = '1724e4a3-70b5-4c3f-87e1-06ab29627e4b'
    const selectedCategory = 0 // Ou qualquer valor de categoria desejado
    const selectedDay = 0 // Ou qualquer valor de dia desejado

    // Função para fazer a solicitação à API
    async function fetchMenuProducts() {
      try {
        const response = await fetch(
          `https://localhost:8080/api/menu/getMenuProducts?SelectedMenu=${selectedMenu}&SelectedCategory=${selectedCategory}&SelectedDay=${selectedDay}`,
          {
            method: 'GET',
            headers: {
              Accept: '*/*',
            },
          }
        )

        if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.status}`)
        }

        const data = await response.json()
        // Atualiza o estado com os dados da resposta
        setProductList(data.productList)
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error)
      }
    }

    fetchMenuProducts()
  }, [])

  return (
    <MapContext.Provider
      value={{
        currentSelectCategory,
        setcurrentSelectCategory,
        isLoading,
        setIsLoading,
        // Defina os valores iniciais do contexto, se necessário.
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
