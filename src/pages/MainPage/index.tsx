import { useState } from "react"
import { Button, FileInput, Header } from "@/components"

const MainPage = () => {
    const [file, setFile] = useState<File | null>(null)

    return (
        <div>
            <Header />
            <div className="container">
                <FileInput selectedFile={file} onFileSelect={setFile} />
                <Button
                    isDisabled={!file}
                    onClick={() => console.log(file?.name)}
                >
                    Check plant
                </Button>
            </div>
        </div>
    )
}

export default MainPage