import { Button, PageContainer } from "@/components"
import { useNavigate } from "react-router-dom"

const ErrorPage = () => {
    const navigate = useNavigate()

    return (
        <PageContainer>
            <h1 style={{ marginBottom: '10px' }}>404</h1>
            <p style={{ marginBottom: '40px' }}>Page not found</p>
            <Button onClick={() => navigate('/')}>Back to main</Button>
        </PageContainer>
    )
}

export default ErrorPage