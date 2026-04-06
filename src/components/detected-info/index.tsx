import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BackButton } from '../back-button'

import styles from './style.module.css'
import { getImageById } from '@/utils/imageStorage'

interface PredictionResult {
    id?: string
    disease: string
    confidence: number
    treatment: string
    recommendations: string
    image_quality?: string
    timestamp?: string
    imageUrl?: string
}


export const DetectedInfo = () => {
    const navigate = useNavigate()
    const { detectedId } = useParams<{ detectedId: string }>()

    const [result, setResult] = useState<PredictionResult | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        
        if (!detectedId) {
            setError('ID анализа не найден')
            setIsLoading(false)
            return
        }

        loadResult(detectedId)
    }, [detectedId])

    const loadResult = async (id: string) => {
        setIsLoading(true)
        setError(null)

        try {
            // Получаем результат из sessionStorage
            const savedResult = sessionStorage.getItem(`prediction_${id}`)
            
            if (savedResult) {
                const parsed = JSON.parse(savedResult);
                setResult(parsed)

                const savedImage = getImageById(id!);
                if (savedImage) {
                    setImageUrl(savedImage);
                } else if (parsed.imageDataUrl) {
                    setImageUrl(parsed.imageDataUrl);
                }
            } else {
                setError('Результат не найден. Возможно, анализ был удален или истек срок хранения.')
            }
            
        } catch (err: any) {
            console.error('Ошибка загрузки результата:', err)
            setError('Ошибка загрузки результата')
        } finally {
            setIsLoading(false)
        }
    }

    console.log(result)

    const handleNewAnalysis = () => {
        if (detectedId) {
            sessionStorage.removeItem(`prediction_${detectedId}`)
        }
        navigate('/')
    }

    return (
        <div className={styles.info_container}>
            <BackButton onClick={handleNewAnalysis} />
            {isLoading ? (
                <div className="container flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Загрузка результатов...</p>
                    </div>
                </div>
            ) : 
            (error || !result) ? (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                    {error || 'Результаты не найдены. Пожалуйста, проведите новый анализ.'}
                </div>
            ) : (
                <>
                    <div className={styles.detected_img_container}>
                        <div className={styles.detected_img}>
                            <img src={imageUrl || ''} alt="detected image" />
                        </div>
                        <h3 style={{ color: '#C65353' }}>{result.disease}</h3>
                    </div>
                    <div className={styles.detected_instruction}>
                        <h3>Instruction:</h3>
                        <p>{result.recommendations}</p>
                    </div>
                </>
            )}
        </div>
    )
}