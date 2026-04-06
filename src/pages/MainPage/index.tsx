import { useState } from "react"
import { Button, FileInput, Header } from "@/components"
import { useNavigate } from "react-router-dom"
import axiosInstance from "@/config/axios"
import { saveImageToPublic } from "@/utils/imageStorage"

const MainPage = () => {
    const [file, setFile] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate()

    const generateUniqueId = () => {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    const handlePredict = async () => {
        if (!file) return

        setIsLoading(true)
        setError(null)

        const analysisId = generateUniqueId()
        const imageUrl = URL.createObjectURL(file)
        
        const formData = new FormData()
        formData.append('file', file)
        formData.append('analysis_id', analysisId)

        try {
            const imageDataUrl = await saveImageToPublic(file, analysisId)
            
            const response = await axiosInstance.post('http://localhost:8000/api/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 30000
            })

            const resultWithId = {
                ...response.data,
                id: analysisId,
                timestamp: new Date().toISOString(),
                imageUrl: imageDataUrl,
            }
            
            sessionStorage.setItem(`prediction_${analysisId}`, JSON.stringify(resultWithId))
            
            navigate(`/detected/${analysisId}`)
            
        } catch (err: any) {
            console.error('Ошибка при анализе:', err)
            setError(err.response?.data?.detail || 'Произошла ошибка при анализе изображения');
            
            // Если ошибка, удаляем сохраненное изображение
            const storageKey = `plant_image_${analysisId}`;
            localStorage.removeItem(storageKey);
            sessionStorage.removeItem(storageKey);
            
            // Очищаем созданный URL
            URL.revokeObjectURL(imageUrl)
            
            if (err.response?.status === 401) {
                setError('Сессия истекла. Пожалуйста, войдите снова.')
                setTimeout(() => navigate('/login'), 2000)
            } else if (err.response?.data?.detail) {
                setError(err.response.data.detail)
            } else if (err.code === 'ECONNABORTED') {
                setError('Превышено время ожидания. Попробуйте еще раз.')
            } else {
                setError('Ошибка при анализе изображения. Попробуйте еще раз.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <FileInput selectedFile={file} onFileSelect={setFile} />
                <Button
                    isDisabled={!file || isLoading}
                    onClick={handlePredict}
                >
                    Check plant
                </Button>
            </div>
        </>
    )
}

export default MainPage