import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MainPage from '@/pages/MainPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DetectedPage from '@/pages/DetectedPage'
import ErrorPage from '@/pages/ErrorPage'
import { ProtectedRoute } from './components'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            } />
          <Route
            path='detected/:detectedId'
            element={
              <ProtectedRoute>
                <DetectedPage />
              </ProtectedRoute>
            } />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
