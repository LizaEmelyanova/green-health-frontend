import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../button"
import { Input } from "../input"

import styles from './style.module.css'
import { useAuth } from "@/contexts/AuthContext"

export const RegisterForm = () => {
    const [nameValue, setNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState<{
      name?: string;
      email?: string;
      password?: string;
    }>({})
    const { register, isLoading } = useAuth()

    const navigate = useNavigate()

    const validateForm = () => {
      const errors: typeof fieldErrors = {}
        
      if (!nameValue.trim()) {
        errors.name = 'Имя обязательно'
      } else if (nameValue.trim().length < 2) {
        errors.name = 'Имя должно содержать минимум 2 символа'
      } else if (nameValue.trim().length > 50) {
        errors.name = 'Имя не должно превышать 50 символов'
      }

      if (!emailValue.trim()) {
        errors.email = 'Email обязателен'
      } else if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(emailValue)) {
        errors.email = 'Введите корректный email'
      }

      if (!passwordValue) {
        errors.password = 'Пароль обязателен'
      } else if (passwordValue.length < 6) {
        errors.password = 'Пароль должен содержать минимум 6 символов'
      } else if (passwordValue.length > 100) {  // Добавляем ограничение
        errors.password = 'Пароль не должен превышать 100 символов'
      } else if (passwordValue !== confirmPassword) {
        errors.password = 'Пароли не совпадают'
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
        const registerData = {
          name: nameValue.trim(),
          email: emailValue.trim().toLowerCase(),
          password: passwordValue
        }

        console.log('Отправка данных регистрации:', registerData)

        await register(registerData.name, registerData.email, registerData.password)
        navigate('/')
      } catch (err: any) {
        console.error('Ошибка регистрации:', err)
        if (err.response?.data?.detail) {
          setError(err.response.data.detail)
        } else if (err.message) {
          setError(err.message)
        } else {
          setError('Ошибка при регистрации. Попробуйте позже.')
        }
      }
    }

    return (
        <div className={styles.register_form_container}>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <form className={styles.register_form}>
                <Input
                    placeholder="Name"
                    value={nameValue}
                    onChange={setNameValue}
                    disabled={isLoading}
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
                )}

                <Input
                    placeholder="Email"
                    value={emailValue}
                    onChange={setEmailValue}
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
                
                <Input
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    disabled={isLoading}
                />
            </form>
            <div className={styles.register_form_btns}>
                <Button
                    type="submit"
                    isDisabled={!emailValue || !passwordValue || isLoading}
                    onClick={handleSubmit}
                >
                    Register
                </Button>
                <p
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/login')}
                >
                    Log in
                </p>
            </div>
            
        </div>
    )
}