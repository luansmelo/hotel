'use client'
import { IProductInputDataResponse } from '@/atom/business'
import { InputsOnProducts, Product } from '@/components/product/types'
import { ProductService } from '@/services/product/product'
import { handleToastify } from '@/utils/toastify'
import axios from 'axios'
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from 'react'

interface ProductContract {
  productList: Product[]
  loading: boolean
  productDetail: any
  handleSave: (input: Product) => Promise<void>
  handleDelete: (id: string) => Promise<void>
  handleProductDetails: (id: string) => Promise<void>
  handleAddInputsToProduct: (input: InputsOnProducts) => Promise<void>
  handleRemoveInputFromProduct: (
    productId: string,
    inputId: string
  ) => Promise<void>
}

export const ProductContext = createContext<ProductContract>(
  {} as ProductContract
)
export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(false)
  const [productDetail, setProductDetail] = useState<IProductInputDataResponse>(
    {} as IProductInputDataResponse
  )

  const product = useMemo(() => new ProductService(), [])
  const fetchProductList = async () => {
    setLoading(true)
    try {
      const res = await product.list()
      setProductList(res?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }

  useEffect(() => {
    fetchProductList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async (input: Product) => {
    try {
      const response = await product.handle(input)

      if (response?.ok) {
        await fetchProductList()
        handleToastify('Produto adicionado com sucesso!', 'success')
      } else {
        handleToastify('Não foi possível adicionar o produto.', 'error')
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setLoading(true)

      const response = await product.delete(id)
      console.log('response', response)
      if (response.message === 'sucesso') {
        await fetchProductList()
        handleToastify('Produto excluído com sucesso!', 'success')
      } else {
        handleToastify('Não foi possível excluir o produto.', 'error')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleProductDetails = async (id: string) => {
    setLoading(true)
    try {
      const response = await product.getPredefinedProduct(id)

      setProductDetail(response)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddInputsToProduct = async (input: InputsOnProducts) => {
    try {
      setLoading(true)
      const response = await product.addInputToProduct(input)

      console.log('RES', response)
      if (response?.ok) {
        handleToastify('Inputs adicionados ao produto com sucesso!', 'success')
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      await fetchProductList()
      setLoading(false)
    }
  }

  const handleRemoveInputFromProduct = async (
    productId: string,
    inputId: string
  ) => {
    const apiUrl = `https://localhost:7196/api/product/removeInputFromProduct/${productId}/${inputId}`

    try {
      setLoading(true)

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
        setLoading(false)
      }, 750)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        loading,
        productDetail,
        productList,
        handleDelete,
        handleSave,
        handleProductDetails,
        handleAddInputsToProduct,
        handleRemoveInputFromProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
