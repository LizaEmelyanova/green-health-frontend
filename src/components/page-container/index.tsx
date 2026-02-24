import { Leaf } from '@/assets/icons'
import styles from './style.module.css'

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.page_container}>
            <Leaf
                width={463}
                height={463}
                color='#7EA46F4D'
                style={{
                    position: 'absolute',
                    left: '-70px',
                    bottom: '-35px',
                    rotate: '-80deg'
                }}
            />
            {children}
            <Leaf
                width={222}
                height={222}
                color='#7EA46F4D'
                style={{
                    position: 'absolute',
                    right: '15px',
                    top: '20px',
                    rotate: '-8deg'
                }}
            />
        </div>
    )
}