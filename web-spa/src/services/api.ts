export const apiurl = 'http://localhost:3003/v1'

import cookies from 'js-cookie'

export class API {
  private static instance: API | null = null
  private apiurl: string

  private constructor() {
    this.apiurl = apiurl
  }

  private getCookie() {
    return cookies.get('at')
  }

  static getInstance(): API {
    if (!API.instance) {
      API.instance = new API()
    }
    return API.instance
  }

  async get(endpoint: string) {
    const response = await fetch(`${this.apiurl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getCookie()}`,
      },
    })

    return response.json()
  }

  async post(endpoint: string, body: any) {
    const response = await fetch(`${this.apiurl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getCookie() ? `Bearer ${this.getCookie()}` : '',
      },
      body: JSON.stringify(body),
    })

    return response
  }

  async put(endpoint: string, body: any) {
    const response = await fetch(`${this.apiurl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getCookie() ? `Bearer ${this.getCookie()}` : '',
      },
      body: JSON.stringify(body),
    })

    return response.json()
  }

  async delete(endpoint: string) {
    const response = await fetch(`${this.apiurl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getCookie() ? `Bearer ${this.getCookie()}` : '',
      },
    })

    return response.json()
  }
}
