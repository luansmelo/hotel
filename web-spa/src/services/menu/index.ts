import { InputContract } from '@/atom/business'
import { API } from '@/services/api'
import { MenuCategoryProps, MenuCreateProps } from '@/utils/interfaces/menu'

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

  async addCategoryToMenu(input: MenuCategoryProps) {
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
      console.log('ENTROU AQUI', input)
      const response = await api.get(
        `/menu/select/filter?menu=${input.menuId}&category=${input.categoryId}&day=${input.weekDay}`
      )

      console.log('RETORNO DA API', response)
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
