import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../button"
import { Input } from "../input"

import styles from './style.module.css'

export const RegisterForm = () => {
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const navigate = useNavigate()

    return (
        <div className={styles.register_form_container}>
            <form action="" className={styles.register_form}>
                <Input
                    placeholder="Email"
                    value={emailValue}
                    onChange={setEmailValue}
                />
                <Input
                    placeholder="Password"
                    value={passwordValue}
                    onChange={setPasswordValue}
                />
            </form>
            <div className={styles.register_form_btns}>
                <Button
                    isDisabled={!emailValue || !passwordValue}
                    onClick={() => console.log('click')}
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