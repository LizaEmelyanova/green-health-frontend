import { useNavigate, useParams } from 'react-router-dom'
import { BackButton } from '../back-button'

import styles from './style.module.css'

export const DetectedInfo = () => {
    const navigate = useNavigate()
    const { detectedId } = useParams()

    return (
        <div className={styles.info_container}>
            <BackButton onClick={() => navigate('/')} />
            <div className={styles.detected_img_container}>
                <div className={styles.detected_img}>
                    <img src="" alt="detected image" />
                </div>
                <h3 style={{ color: '#C65353' }}>under/overwatering</h3>
            </div>
            <div className={styles.detected_instruction}>
                <h3>Instruction:</h3>
                <p>{`Id: ${detectedId}`}</p>
            </div>
        </div>
    )
}