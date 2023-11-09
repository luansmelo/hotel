import {
  IProductInputDataResponse,
  IProductInputResponse,
  IProductResponse,
} from '@/atom/business'
import { handleToastify } from '@/utils/toastify'
import api from '@/config/configApi'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

interface IProductContext {
  productList: IProductResponse[]
  isLoading: boolean
  productDetail: IProductInputDataResponse
  isDetailLoading: boolean
  handleAddProduct: (newProduct: IProductResponse) => Promise<void>
  handleDeleteProduct: (productId: string) => Promise<void>
  handleGetProductDetails: (productId: string) => Promise<void>
  handleAddInputsToProduct: (
    productInputs: IProductInputResponse[]
  ) => Promise<void>
  handleRemoveInputFromProduct: (
    productId: string,
    inputId: string
  ) => Promise<void>
}

const ProductContext = createContext<IProductContext | null>(null)

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [productList, setProductList] = useState<IProductResponse[]>([])
  const [productDetail, setProductDetail] = useState<
    IProductInputDataResponse | undefined
  >()
  const [isLoading, setIsLoading] = useState(false)
  const [isDetailLoading, setIsDetailLoading] = useState(false)

  const fetchProductList = async () => {
    try {
      const response = await api.get('/product/all')

      if (response?.data?.productList) {
        setProductList(response.data.productList)
      } else {
        console.error('Erro ao buscar a lista de produtos:', error)
        throw new Error(
          'A lista de produtos está vazia ou não foi retornada corretamente.'
        )
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchProductList()
  }, [])

  const handleAddProduct = async (newProduct: IProductResponse) => {
    try {
      setIsLoading(true)

      const response = await api.post('/product/create', {
        name: newProduct.name,
        description: newProduct.description,
      })

      if (response.status === 201) {
        handleToastify('Produto adicionado com sucesso!', 'success')
      } else {
        handleToastify('Não foi possível criar um novo produto.', 'error')
      }
    } catch (error) {
      console.error('Erro ao adicionar o produto:', error)
      handleToastify(error.response.data.message, 'error')
    } finally {
      await fetchProductList()
      setIsLoading(false)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      setIsLoading(true)

      const response = await api.delete(`/product/${productId}`)

      if (response.status === 200) {
        await fetchProductList()
        setTimeout(() => {
          handleToastify('Produto excluído com sucesso!', 'success')
        }, 750)
      } else {
        await fetchProductList()
        setTimeout(() => {
          handleToastify('Não foi possível excluir o produto.', 'error')
        }, 750)
      }
    } catch (error) {
      setTimeout(() => {
        handleToastify('Não foi possível excluir o produto.', 'error')
      }, 750)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 750)
    }
  }

  const handleGetProductDetails = async (productId: string) => {
    try {
      setIsDetailLoading(true)

      const response = await api.get(`/product/details/${productId}`)

      if (response.status === 200) {
        const productDetails = response.data

        setTimeout(() => {
          setProductDetail(productDetails)
        }, 750)
      } else {
        setTimeout(() => {
          setProductDetail(undefined)
          handleToastify(
            'Não foi possível recuperar os detalhes do produto.',
            'error'
          )
        }, 750)
      }
    } catch (error) {
      console.log('error', error)
      setTimeout(() => {
        handleToastify('Erro ao recuperar os detalhes do produto', 'error')
      }, 750)
    } finally {
      setTimeout(() => {
        setIsDetailLoading(false)
      }, 750)
    }
  }

  const handleAddInputsToProduct = async (
    productInputs: IProductInputResponse[]
  ) => {
    const apiUrl = 'https://localhost:8080/api/product/addInputToProduct'

    try {
      setIsDetailLoading(true)

      const response = await api.post(apiUrl, productInputs, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 200) {
        setTimeout(() => {
          handleToastify(
            'Inputs adicionados ao produto com sucesso!',
            'success'
          )
        }, 750)
      } else {
        setTimeout(() => {
          setProductDetail(undefined)
          handleToastify(
            'Não foi possível adicionar inputs ao produto.',
            'error'
          )
        }, 750)
      }
    } catch (error) {
      console.log('error', error)
      setTimeout(() => {
        handleToastify('Erro ao adicionar inputs ao produto', 'error')
      }, 750)
    } finally {
      await fetchProductList()
      setIsDetailLoading(false)
    }
  }

  const handleRemoveInputFromProduct = async (
    productId: string,
    inputId: string
  ) => {
    const apiUrl = `https://localhost:8080/api/product/removeInputFromProduct/${productId}/${inputId}`

    try {
      setIsLoading(true)

      const response = await api.delete(apiUrl, {
        headers: {
          Accept: '*/*',
        },
      })

      if (response.status === 200) {
        await fetchProductList()
        setTimeout(() => {
          handleToastify('Input removido com sucesso do produto!', 'success')
        }, 750)
      } else {
        await fetchProductList()
        setTimeout(() => {
          handleToastify(
            'Não foi possível remover o input do produto.',
            'error'
          )
        }, 750)
      }
    } catch (error) {
      setTimeout(() => {
        handleToastify('Não foi possível remover o input do produto.', 'error')
      }, 750)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 750)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        productList,
        productDetail,
        isDetailLoading,
        isLoading,
        handleDeleteProduct,
        handleAddProduct,
        handleGetProductDetails,
        handleAddInputsToProduct,
        handleRemoveInputFromProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error(
      'useProductContext deve ser usado dentro de um ProductProvider'
    )
  }
  return context
}
