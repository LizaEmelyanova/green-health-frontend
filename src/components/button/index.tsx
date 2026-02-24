import styles from './style.module.css'

interface ButtonProps {
    children: React.ReactNode
    isDisabled?: boolean
    onClick: () => void
} 

export const Button = ({
    children,
    isDisabled = false,
    onClick
}: ButtonProps) => {
    return (
        <button
            className={styles.button}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}