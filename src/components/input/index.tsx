import styles from './styles.module.css'

interface InputProps {
    type?: string
    placeholder?: string
    value: string
    onChange: (value: string) => void
}

export const Input = ({
    type = 'text',
    placeholder,
    value,
    onChange
}: InputProps) => {
    return (
        <input
            className={styles.input}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}