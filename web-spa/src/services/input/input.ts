import { InputContract } from '@/atom/business'
import { API } from '@/services/api'

const api = API.getInstance('http://localhost:3003/v1')

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
      const response = await api.get('/input/')

      return response
    } catch (error) {
      console.log(error)
    }
  }
}
