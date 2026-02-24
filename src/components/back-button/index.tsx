import { ChevronLeft } from '@/assets/icons'

import styles from './style.module.css'

export const BackButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className={styles.back_button} onClick={onClick}>
            <ChevronLeft style={{ marginLeft: '-3px' }} />
        </div>
    )
}