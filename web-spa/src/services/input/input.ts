import { InputContract } from '@/atom/business'
import { API } from '@/services/api'

const api = API.getInstance()

export class InputService {
  async handle(input: InputContract) {
    try {
      const response = await api.post('/input/create', input)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async list() {
    try {
      const response = await api.get('/input')

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id: string) {
    try {
      const response = await api.delete(`/input/${id}`)
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
