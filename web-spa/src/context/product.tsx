'use client'

import {
  InputsOnProducts,
  ProductProps,
  UpdatedProductInfo,
  ProductRemoveProps,
  ProductInputProps,
} from '@/components/product/types'
import { ProductService } from '@/services/product/product'
import { handleToastify } from '@/utils/toastify'

import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react'

interface ProductContract {
  loading: boolean
  productList: ProductProps[]
  productDetail: ProductProps
  setProductList: Dispatch<SetStateAction<ProductProps[]>>
  setProductDetail: Dispatch<SetStateAction<ProductProps>>
  handleSave: (input: ProductInputProps) => Promise<void>
  handleEdit: (productId: string, input: UpdatedProductInfo) => Promise<void>
  handleDelete: (id: string) => Promise<void>
  handleProductDetails: (id: string) => Promise<void>
  handleAddInputsToProduct: (input: InputsOnProducts) => Promise<void>
  handleDeleteInputsToProduct: (input: ProductRemoveProps) => Promise<void>
}

export const ProductContext = createContext<ProductContract>(
  {} as ProductContract
)
export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [productList, setProductList] = useState<ProductProps[]>([])
  const [loading, setLoading] = useState(false)
  const [productDetail, setProductDetail] = useState<ProductProps>(
    {} as ProductProps
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

  const handleSave = async (input: ProductInputProps) => {
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

  const handleDeleteInputsToProduct = async (input: ProductRemoveProps) => {
    try {
      setLoading(true)
      const res = await product.removeInputToProduct(input)

      if (res.message === 'sucesso') {
        handleToastify('Input removido do produto com sucesso!', 'success')
        await handleProductDetails(input.productId)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }
  const handleEdit = async (productId: string, data: UpdatedProductInfo) => {
    try {
      const res = await product.updatePredefinedProduct(productId, data)
      if (res.message === 'sucesso') {
        handleToastify('Produto atualizado com sucesso!', 'success')
        await fetchProductList()
      }
    } catch (error) {
      console.log('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        loading,
        productDetail,
        productList,
        setProductList,
        setProductDetail,
        handleDelete,
        handleSave,
        handleEdit,
        handleProductDetails,
        handleAddInputsToProduct,
        handleDeleteInputsToProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
