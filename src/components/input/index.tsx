import type { ChangeEvent } from 'react'
import styles from './styles.module.css'

interface InputProps {
    type?: string
    placeholder?: string
    value: string
    disabled: boolean
    onChange: (value: string) => void
}

export const Input = ({
    type = 'text',
    placeholder,
    value,
    disabled,
    onChange
}: InputProps) => {
    return (
        <input
            className={styles.input}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            disabled={disabled}
        />
    )
}