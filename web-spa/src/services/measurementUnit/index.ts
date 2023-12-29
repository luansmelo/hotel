import { MeasurementUnitContract } from '@/components/input/MeasurementUnit/types'
import { API } from '@/services/api'

const api = API.getInstance()

export class MeasurementUnitService {
  async handle(input: MeasurementUnitContract) {
    try {
      const response = await api.post('/measurementUnit/create', input)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async list() {
    try {
      const response = await api.get('/measurementUnit')

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id: string) {
    try {
      const response = await api.delete(`/measurementUnit/${id}`)
      console.log('RESPONSE', response)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async update(input: MeasurementUnitContract) {
    try {
      const response = await api.put(`/measurementUnit/${input.id}`, input)

      return response
    } catch (error) {
      console.log(error)
    }
  }
}
