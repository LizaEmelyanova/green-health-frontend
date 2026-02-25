import { useState } from "react"
import { Button, FileInput, Header } from "@/components"
import { useNavigate } from "react-router-dom"

const MainPage = () => {
    const [file, setFile] = useState<File | null>(null)

    const navigate = useNavigate()

    return (
        <>
            <Header />
            <div className="container">
                <FileInput selectedFile={file} onFileSelect={setFile} />
                <Button
                    isDisabled={!file}
                    onClick={() => navigate('/detected/1')}
                >
                    Check plant
                </Button>
            </div>
        </>
    )
}

export default MainPage