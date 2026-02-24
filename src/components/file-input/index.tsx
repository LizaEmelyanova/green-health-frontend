import { type ChangeEvent, useRef, type DragEvent } from "react"
import { Close, CloudUpload } from '@/assets/icons'

import styles from './style.module.css'

interface FileInputProps {
    selectedFile: File | null
    onFileSelect: (file: File | null) => void
}

export const FileInput = ({ selectedFile, onFileSelect }: FileInputProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onFileSelect(file);
    };

    const handleClean = () => {
        onFileSelect(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
    };

    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                onFileSelect(file);
            } else {
                alert("Please upload the image file");
            }
        }
    };

    return (
        <div
            className={styles.file_input}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
        >
            <CloudUpload
                color='#7EA46F'
                width={60}
                height={60}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -80%)'
                }}
            />
            <input
                ref={fileInputRef}
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
            />

            {selectedFile ? (
                <div className={styles.selected_file}>
                    <p>{selectedFile.name}</p>
                    <Close onClick={handleClean} />
                </div>
            ) : (
                <>
                    <label
                        htmlFor="file-upload"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            fileInputRef.current?.click();
                        }}
                    >
                        Choose file
                    </label>
                    <p>or drag it into window</p>
                </>
            )}
        </div>
    )
}