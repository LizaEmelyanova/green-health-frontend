import styles from './style.module.css'

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined
    children: React.ReactNode
    isDisabled?: boolean
    onClick: () => void
} 

export const Button = ({
    type,
    children,
    isDisabled = false,
    onClick
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={styles.button}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}