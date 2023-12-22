import { InputContract } from '@/atom/business'
import {
  InputsOnProducts,
  Product,
  UpdatedProductInfo,
} from '@/components/product/types'
import { API } from '@/services/api'

const api = API.getInstance()

export class ProductService {
  async handle(input: Product) {
    try {
      const response = await api.post('/product/create', input)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async addInputToProduct(input: InputsOnProducts) {
    try {
      const response = await api.post('/product/add/input', input)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async getPredefinedProduct(id: string) {
    try {
      const response = await api.get(`/product/details/${id}`)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async updatePredefinedProduct(
    productId: string,
    updatedInfo: UpdatedProductInfo
  ) {
    try {
      const response = await api.put(`/product/${productId}`, updatedInfo)
      console.log('Response', response)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async list() {
    try {
      const response = await api.get('/product')

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id: string) {
    try {
      const response = await api.delete(`/product/${id}`)
      console.log('RESPONSE', response)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async update(input: InputContract) {
    try {
      const response = await api.put(`/input/${input.id}`, input)

      return response
    } catch (error) {
      console.log(error)
    }
  }
}
