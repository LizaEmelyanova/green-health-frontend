// src/config/axios.ts
import axios from 'axios'

// Настройка базового URL
axios.defaults.baseURL = 'http://localhost:8000'

// Добавляем интерцептор для обработки ошибок
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Обработка неавторизованного доступа
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axios