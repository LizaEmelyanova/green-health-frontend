import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../button"
import { Input } from "../input"

import styles from './style.module.css'
import { useAuth } from "@/contexts/AuthContext"

export const LoginForm = () => {
    const [loginValue, setLoginValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState<{
      email?: string;
      password?: string;
    }>({})

    const { login, isLoading } = useAuth()

    const navigate = useNavigate()

    const validateForm = () => {
      const errors: typeof fieldErrors = {}
        
      if (!loginValue.trim()) {
        errors.email = 'Email обязателен'
      } else if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(loginValue)) {
        errors.email = 'Введите корректный email'
      }

      if (!passwordValue) {
        errors.password = 'Пароль обязателен'
      } else if (passwordValue.length < 6) {
        errors.password = 'Пароль должен содержать минимум 6 символов'
      }

      setFieldErrors(errors)
      return Object.keys(errors).length === 0
    }

    const handleSubmit = async () => {
        setError('')
        setFieldErrors({})

        if (!validateForm()) {
          return
        }

        try {
            const loginData = {
              email: loginValue.trim().toLowerCase(),
              password: passwordValue
            }

            console.log('Отправка данных входа:', { email: loginData.email })

            await login(loginData.email, loginData.password)
            navigate('/')
        } catch (err: any) {
            console.error('Ошибка входа:', err)
      
            // Обработка различных типов ошибок
            if (err.response?.data?.detail) {
              setError(err.response.data.detail)
            } else if (err.message) {
              setError(err.message)
            } else {
              setError('Ошибка при входе. Проверьте email и пароль.')
            }
        }
    }

    return (
        <div className={styles.login_form_container}>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.login_form}>
                <Input
                    placeholder="Login"
                    value={loginValue}
                    onChange={setLoginValue}
                    disabled={isLoading}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                )}

                <Input
                    placeholder="Password"
                    value={passwordValue}
                    onChange={setPasswordValue}
                    disabled={isLoading}
                />
                {fieldErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
                )}
            </form>
            <div className={styles.login_form_btns}>
                <Button
                    isDisabled={!loginValue || !passwordValue || isLoading}
                    onClick={handleSubmit}
                >
                    Log in
                </Button>
                <p
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/register')}
                >
                    Register
                </p>
            </div>
            
        </div>
    )
}