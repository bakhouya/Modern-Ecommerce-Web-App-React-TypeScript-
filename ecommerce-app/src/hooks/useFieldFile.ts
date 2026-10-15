

import { useState, useCallback } from 'react';

interface UseFieldFileProps {
    multiple?: boolean;
    maxSize?: number; 
    acceptedTypes?: string[];
    required?: boolean;
}
const defaultAcceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

export const useFieldFile = ({multiple = false, maxSize = 5, acceptedTypes = defaultAcceptedTypes, required = false}: UseFieldFileProps = {}) => {
   
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [error, setError] = useState('');

    const maxSizeBytes = maxSize * 1024 * 1024;

    const generatePreviews = (fileList: File[]): string[] => {
        return fileList.map(f => URL.createObjectURL(f));
    };

    const revokePreviews = (urls: string[]) => {
        urls.forEach(url => URL.revokeObjectURL(url));
    };

    const addFiles = useCallback(
        (newFiles: FileList | File[]) => {
            const incoming = Array.isArray(newFiles) ? newFiles : Array.from(newFiles);
            if (incoming.length === 0) return false;

            const valid: File[] = [];
            for (const file of incoming) {
                if (!(file instanceof File)) continue;
                if (!acceptedTypes.includes(file.type)) {
                    setError(`Type de fichier non supporté: ${acceptedTypes.join(', ')}`);
                    return false;
                }
                if (file.size > maxSizeBytes) {
                    setError(`Fichier trop volumineux (taille maximale ${maxSize} Mo)`);
                    return false;
                }
                valid.push(file);
            }

            if (multiple) {
                const newPreviews = generatePreviews(valid);
                setFiles(prev => [...prev, ...valid]);
                setPreviews(prev => [...prev, ...newPreviews]);
            } else {
                revokePreviews(previews);
                const newPreviews = generatePreviews(valid);
                setFiles(valid);
                setPreviews(newPreviews);
            }
            setError('');
            return true;
        },
        [multiple, acceptedTypes, maxSizeBytes, maxSize, previews]
    );

    const removeFile = useCallback(
        (index: number) => {
            if (index < 0 || index >= files.length) return;
            URL.revokeObjectURL(previews[index]);
            const newFiles = files.filter((_, i) => i !== index);
            const newPreviews = previews.filter((_, i) => i !== index);
            setFiles(newFiles);
            setPreviews(newPreviews);
            setError('');
        },
        [files, previews]
    );

    const reset = useCallback(() => {
        previews.forEach(url => URL.revokeObjectURL(url));
        setFiles([]);
        setPreviews([]);
        setError('');
    }, [previews]);

    const validate = useCallback(() => {
        if (required && files.length === 0) {
            setError('Ce champ est requis');
            return false;
        }
        return true;
    }, [required, files.length]);

    return { files, previews, error, addFiles, removeFile, reset, validate, multiple};
};









