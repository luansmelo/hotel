'use client'
import {
  IProductInputDataResponse,
  IProductInputResponse,
  IProductResponse,
} from '@/atom/business'
import api from '@/config/api'
import { handleToastify } from '@/utils/toastify'
import axios from 'axios'
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
  handleAddProduct: (input: IProductResponse) => Promise<void>
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
  const [productList, setProductList] = useState([])
  const [productDetail, setProductDetail] =
    useState<IProductInputDataResponse>()
  const [isLoading, setIsLoading] = useState(false)
  const [isDetailLoading, setIsDetailLoading] = useState(false)

  const fetchProductList = async () => {
    try {
      const response = await api.get('/product')
      setProductList(response?.data?.productList)
    } catch (error) {
      setProductList([])
    }
  }

  useEffect(() => {
    fetchProductList()
  }, [])

  const handleAddProduct = async (input: IProductResponse) => {
    try {
      const response = await api.post('/product/create', input)

      if (response.status === 201) {
        await fetchProductList()
        setTimeout(() => {
          handleToastify('Produto adicionado com sucesso!', 'success')
        }, 750)
      } else {
        await fetchProductList()
        setTimeout(() => {
          handleToastify('Não foi possível criar um novo produto.', 'error')
        }, 750)
      }
    } catch (error) {
      console.log('error', error)
      setTimeout(() => {
        handleToastify(error.response.data.message, 'error')
      }, 750)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    const apiUrl = `https://localhost:7196/api/product/deleteProduct/${productId}`

    try {
      setIsLoading(true)

      const response = await axios.delete(apiUrl, {
        headers: {
          Accept: '*/*',
        },
      })

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
    const apiUrl = `https://localhost:7196/api/product/productDetail/${productId}`

    try {
      setIsDetailLoading(true)

      const response = await axios.get(apiUrl, {
        headers: {
          Accept: '*/*',
        },
      })

      if (response.status === 200) {
        const productDetails = response.data as IProductInputDataResponse

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
    const apiUrl = 'https://localhost:7196/api/product/addInputToProduct'

    try {
      setIsDetailLoading(true)

      const response = await axios.post(apiUrl, productInputs, {
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
    const apiUrl = `https://localhost:7196/api/product/removeInputFromProduct/${productId}/${inputId}`

    try {
      setIsLoading(true)

      const response = await axios.delete(apiUrl, {
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
