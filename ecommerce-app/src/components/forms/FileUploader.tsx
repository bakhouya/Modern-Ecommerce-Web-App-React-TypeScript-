


import { X, Upload } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    label: string;
    previews: string[];          
    initialPreviews?: string[];  
    error?: string;
    onAddFiles: (files: FileList) => void;
    onRemoveFile: (index: number) => void;
    multiple?: boolean;
}
export function FileUploader({label, previews, initialPreviews = [], error, onAddFiles, onRemoveFile, multiple = false}: Props) {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [tempPreviews, setTempPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {tempPreviews.forEach(URL.revokeObjectURL);};
    }, [tempPreviews]);

    const openModal = () => {
        setSelectedFiles([]);
        tempPreviews.forEach(URL.revokeObjectURL);
        setTempPreviews([]);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        tempPreviews.forEach(URL.revokeObjectURL);
        setSelectedFiles([]);
        setTempPreviews([]);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const newFiles = Array.from(files);

        const valid: File[] = [];
        for (const file of newFiles) {
            if (!file.type.startsWith('image/')) {
                alert(t('fileUploader.errors.onlyImages'));
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                alert(t('fileUploader.errors.maxSize'));
                return;
            }
            valid.push(file);
        }
        if (!multiple && valid.length > 1) {
            alert(t('fileUploader.errors.onlyOne'));
            return;
        }


        const newPreviews = valid.map(f => URL.createObjectURL(f));
        tempPreviews.forEach(URL.revokeObjectURL);
        setSelectedFiles(valid);
        setTempPreviews(newPreviews);

    };

    const confirmChange = () => {
        if (selectedFiles.length === 0) return;
        const dataTransfer = new DataTransfer();
        selectedFiles.forEach(f => dataTransfer.items.add(f));
        onAddFiles(dataTransfer.files);
        closeModal();
    };


    if (multiple) {
        const allImages = [...initialPreviews, ...previews];
        return (
            <div className="file-uploader-multi">
                <div className="file-uploader-multi__label">{label}</div>
                <div className="file-uploader-multi__grid">
                    {allImages.map((src, idx) => {
                        const isNew = idx >= initialPreviews.length;
                        const newIndex = idx - initialPreviews.length;
                        return (
                            <div key={src + idx} className="image-card">
                                <img src={src} alt={label} />
                                {isNew && (
                                    <button type="button" className="remove-btn" onClick={() => onRemoveFile(newIndex)}>
                                        ×
                                    </button>
                                )}
                            </div>
                        );
                    })}
                    <div className="add-card" onClick={openModal}>
                        <span>+</span>
                        <span>{t('fileUploader.addLabel', { label })}</span>
                    </div>
                </div>
                {error && <p className="error">{error}</p>}


                {isModalOpen && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-card" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3 className='text text_xxl'>{t('fileUploader.addImages')}</h3>
                                <button className="close" onClick={closeModal}>✕</button>
                            </div>
                            <div className="modal-body">
                                <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
                                    <div>📁</div>
                                    <p>{t('fileUploader.chooseFiles')}</p>
                                    <small>{t('fileUploader.fileTypes')}</small>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handleFileSelect}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                {tempPreviews.length > 0 && (
                                    <div className="temp-previews">
                                        {tempPreviews.map((p, i) => (
                                            <div key={i} className="temp-preview">
                                                <img src={p} alt="aperçu" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn-secondary" onClick={closeModal}>{t('common.cancel')}</button>
                                <button className="btn-primary" onClick={confirmChange} disabled={selectedFiles.length === 0}>
                                    {t('common.confirm')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }


    const displayedImage = previews.length > 0 ? previews[0] : initialPreviews[0];
    return (
        <>
            <div className="file-uploader-single">
                <div className="text text_lg my_end_6">{label}</div>
                <div className="file-uploader-single__container">
                    <div className="image-box" onClick={openModal}>
                        {displayedImage ? (
                            <img src={displayedImage} alt={label} />
                        ) : (
                            <div className="flex_center_center">
                                <div className="placeholder text_center">
                                    <Upload size={38} strokeWidth={1.5} className="text text_sm"/> 
                                    <div className="text text_sm">{t('fileUploader.notFound')}</div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="">

                        {previews.length > 0 && (
                            <div className="remove-box btn sm danger" onClick={() => onRemoveFile(0)}>
                                <span className='text text_sm'> {t('fileUploader.delete')} </span>
                            </div>
                        )}

                    </div>
                </div>
                {error && <p className="error">{error}</p>}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className='text text_xxl'>{t('fileUploader.changeLabel', { label })}</div>
                            <button className="close text text_md" onClick={closeModal}> <X size={20}/>  </button>
                        </div>
                        <div className="modal-body">
                            <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
                                <div className="text text_lg">📁</div>
                                <div className="text text_md">{t('fileUploader.clickToChoose')}</div>
                                <small className="text text_sm">{t('fileUploader.fileTypesShort')}</small>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleFileSelect}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            {tempPreviews.length > 0 && (
                                <div className="temp-preview">
                                    <img src={tempPreviews[0]} alt="aperçu" />
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary btn base sm" onClick={closeModal}>
                                <div className="text text_sm"> {t('common.cancel')} </div>
                            </button>
                            <button className="btn-primary btn primary sm" onClick={confirmChange} disabled={selectedFiles.length === 0}>
                                <div className="text text_sm"> {t('common.confirm')}  </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
        </>
    );
}















