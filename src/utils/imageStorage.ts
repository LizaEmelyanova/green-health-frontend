export const saveImageToPublic = (file: File, id: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                // Получаем base64 строку изображения
                const base64String = e.target?.result as string;
                
                // Создаем ключ для localStorage с префиксом
                const storageKey = `plant_image_${id}`;
                
                // Сохраняем в localStorage (как альтернатива)
                localStorage.setItem(storageKey, base64String);
                
                // Также можно сохранить в sessionStorage для временного хранения
                sessionStorage.setItem(storageKey, base64String);
                
                // Возвращаем data URL для отображения
                resolve(base64String);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = () => reject(new Error('Ошибка чтения файла'));
        reader.readAsDataURL(file);
    });
};

// Получение изображения по ID
export const getImageById = (id: string): string | null => {
    const storageKey = `plant_image_${id}`;
    return localStorage.getItem(storageKey) || sessionStorage.getItem(storageKey);
};

// Удаление изображения
export const deleteImageById = (id: string): void => {
    const storageKey = `plant_image_${id}`;
    localStorage.removeItem(storageKey);
    sessionStorage.removeItem(storageKey);
};