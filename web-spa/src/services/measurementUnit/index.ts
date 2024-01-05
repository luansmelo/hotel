import { MeasurementProps } from '@/components/measurementUnit/MeasurementForm/types'
import { API } from '@/services/api'

const api = API.getInstance()

export class MeasurementUnitService {
  async handle(input: MeasurementProps) {
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

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async update(input: MeasurementProps) {
    try {
      const response = await api.put(`/measurementUnit/${input.id}`, input)

      return response
    } catch (error) {
      console.log(error)
    }
  }
}
