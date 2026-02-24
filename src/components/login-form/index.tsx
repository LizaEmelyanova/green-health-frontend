import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../button"
import { Input } from "../input"

import styles from './style.module.css'

export const LoginForm = () => {
    const [loginValue, setLoginValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const navigate = useNavigate()

    return (
        <div className={styles.login_form_container}>
            <form action="" className={styles.login_form}>
                <Input
                    placeholder="Login"
                    value={loginValue}
                    onChange={setLoginValue}
                />
                <Input
                    placeholder="Password"
                    value={passwordValue}
                    onChange={setPasswordValue}
                />
            </form>
            <div className={styles.login_form_btns}>
                <Button
                    isDisabled={!loginValue || !passwordValue}
                    onClick={() => console.log('click')}
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