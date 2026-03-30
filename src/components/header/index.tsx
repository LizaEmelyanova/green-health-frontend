import { Exit, Leaf } from '@/assets/icons'
import styles from './style.module.css'
import { useAuth } from '@/contexts/AuthContext'

export const Header = () => {
    const { logout } = useAuth()

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div className={styles.header}>
            <div className='container'>
                <div className={styles.header_container}>
                  <div className={styles.header_container}>
                        <Leaf color='#FDFDF1' />
                        Green health
                    </div>
                    <Exit cursor='pointer' onClick={handleLogout} />  
                </div>
            </div>
        </div>
    )
}