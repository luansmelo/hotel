import { API } from '@/services/api'
import { GroupProps } from '@/utils/interfaces/group'

const api = API.getInstance()

export class GroupService {
  async handle(input: GroupProps) {
    try {
      const response = await api.post('/group/create', input)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async list() {
    try {
      const response = await api.get('/group')

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id: string) {
    try {
      const response = await api.delete(`/group/${id}`)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async update(input: GroupProps) {
    try {
      const response = await api.put(`/group/${input.id}`, input)

      return response
    } catch (error) {
      console.log(error)
    }
  }
}
