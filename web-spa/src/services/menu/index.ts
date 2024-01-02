import { InputContract } from '@/atom/business'
import { API } from '@/services/api'
import {
  MenuCategoryProps,
  MenuCreateProps,
  MenuToCategoryProps,
} from '@/utils/interfaces/menu'

const api = API.getInstance()

export class MenuService {
  async handle(input: MenuCreateProps) {
    try {
      const response = await api.post('/menu/create', input)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async addCategoryToMenu(input: MenuToCategoryProps) {
    try {
      const response = await api.post('/menu/add/category', input)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async list() {
    try {
      const response = await api.get('/menu')

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async getMenu(input: MenuCategoryProps) {
    try {
      const response = await api.get(
        `/menu/select/filter?menu=${input.menuId}&category=${input.categoryId}&day=${input.weekDay}`
      )

      return response
    } catch (error) {
      console.log(error)
    }
  }
}
