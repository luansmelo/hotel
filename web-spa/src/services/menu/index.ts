import { InputContract } from '@/atom/business'
import { API } from '@/services/api'
import { MenuProps } from '@/utils/interfaces/menu'

const api = API.getInstance()

export class MenuService {
  async handle(input: MenuProps) {
    try {
      const response = await api.post('/menu/create', input)

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
