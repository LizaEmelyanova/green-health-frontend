import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

export interface User {
  id: string
  email: string
  name: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

class AuthService {
  private accessToken: string | null = null
  private refreshToken: string | null = null
  private tokenExpiry: number | null = null

  constructor() {
    this.loadTokens()
    this.setupAxiosInterceptor()
  }

  private loadTokens() {
    this.accessToken = localStorage.getItem('access_token')
    this.refreshToken = localStorage.getItem('refresh_token')
    const expiry = localStorage.getItem('token_expiry')
    this.tokenExpiry = expiry ? parseInt(expiry) : null
  }

  private saveTokens(tokens: AuthTokens) {
    this.accessToken = tokens.access_token
    this.refreshToken = tokens.refresh_token
    this.tokenExpiry = Date.now() + tokens.expires_in * 1000
    
    localStorage.setItem('access_token', tokens.access_token)
    localStorage.setItem('refresh_token', tokens.refresh_token)
    localStorage.setItem('token_expiry', this.tokenExpiry.toString())
  }

  private clearTokens() {
    this.accessToken = null
    this.refreshToken = null
    this.tokenExpiry = null
    
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('token_expiry')
  }

  private setupAxiosInterceptor() {
    axios.interceptors.request.use(async (config) => {
      if (this.accessToken && this.isTokenExpiringSoon()) {
        await this.refreshAccessToken()
      }
      
      if (this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`
      }
      return config
    })
  }

  private isTokenExpiringSoon(): boolean {
    if (!this.tokenExpiry) return true
    // Обновляем, если токен истекает через 5 минут или меньше
    return Date.now() + 5 * 60 * 1000 >= this.tokenExpiry
  }

  private async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false
    
    try {
      const response = await axios.post<AuthTokens>(`${API_URL}/refresh`, {
        refresh_token: this.refreshToken
      })
      
      this.saveTokens(response.data)
      return true
    } catch (error) {
      this.logout()
      return false
    }
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await axios.post<AuthTokens>(`${API_URL}/login`, credentials)
      this.saveTokens(response.data)
      
      // Получаем информацию о пользователе
      const userResponse = await axios.get<User>(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      })
      
      localStorage.setItem('user', JSON.stringify(userResponse.data))
      return userResponse.data
    } catch (error: any) {
      throw this.handleError(error)
    }
  }

  async register(data: RegisterData): Promise<User> {
    try {
      await axios.post<User>(`${API_URL}/register`, data)
      // После регистрации автоматически логинимся
      return this.login({ email: data.email, password: data.password })
    } catch (error: any) {
      throw this.handleError(error)
    }
  }

  async logout(): Promise<void> {
    if (this.accessToken) {
      try {
        await axios.post(`${API_URL}/logout`, {}, {
          headers: { Authorization: `Bearer ${this.accessToken}` }
        })
      } catch (error) {
        console.error('Logout error:', error)
      }
    }
    
    this.clearTokens()
    localStorage.removeItem('user')
  }

  getAccessToken(): string | null {
    return this.accessToken
  }

  isAuthenticated(): boolean {
    return !!this.accessToken && !!this.tokenExpiry && Date.now() < this.tokenExpiry
  }

  private handleError(error: any): Error {
    if (error.response) {
      const message = error.response.data.detail || 'An error occurred'
      return new Error(message)
    }
    return new Error('Network error')
  }
}

export default new AuthService()