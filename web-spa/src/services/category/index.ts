import { API } from '@/services/api'
import {
  CategoryProps,
  ProductOnCategory,
  RemoveProduct,
} from '@/utils/interfaces/category'

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

  async delete(id: string) {
    try {
      const response = await api.delete('/category/' + id)

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

  async removeProduct(input: RemoveProduct) {
    try {
      const response = await api.delete(
        `/category?menu=${input.menuId}&category=${input.categoryId}&product=${input.productId}&day=${input.weekDay}`
      )

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async update(input: CategoryProps) {
    try {
      const response = await api.put(`/category/${input.id}`, input)

      return response
    } catch (error) {
      console.log(error)
    }
  }
}
