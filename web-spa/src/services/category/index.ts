import { InputContract } from '@/atom/business'
import { API } from '@/services/api'
import { CategoryProps, ProductOnCategory } from '@/utils/interfaces/category'

const api = API.getInstance()

export class CategoryService {
  async handle(input: CategoryProps) {
    try {
      const response = await api.post('/category/create', input)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async list() {
    try {
      const response = await api.get('/category')

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async addProduct(input: ProductOnCategory) {
    try {
      const response = await api.post('/category/add/product', input)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id: string) {
    try {
      const response = await api.delete(`/input/${id}`)
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
