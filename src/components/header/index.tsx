import { Leaf } from '@/assets/icons'
import styles from './style.module.css'

export const Header = () => {
    return (
        <div className={styles.header}>
            <div className='container'>
                <div className={styles.header_container}>
                    <Leaf color='#FDFDF1' />
                    Green health
                </div>
            </div>
        </div>
    )
}