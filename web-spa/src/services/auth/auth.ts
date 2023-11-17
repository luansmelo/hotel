import { API } from '@/services/api'

const api = API.getInstance('http://localhost:3003/v1')

export interface UserLogin {
  email: string
  password: string
}

export interface UserRegister {
  name: string
  email: string
  password: string
}

export class AuthService {
  async login(input: UserLogin) {
    try {
      const response = await api.post('user/signin', input)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async register(input: UserRegister) {
    try {
      const response = await api.post('user/signup', input)

      return response
    } catch (error) {
      console.log(error)
    }
  }
}
