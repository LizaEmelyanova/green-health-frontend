import { useState } from "react"
import { Button, FileInput, Header } from "@/components"

const MainPage = () => {
    const [file, setFile] = useState<File | null>(null)

    return (
        <>
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
        </>
    )
}

export default MainPage