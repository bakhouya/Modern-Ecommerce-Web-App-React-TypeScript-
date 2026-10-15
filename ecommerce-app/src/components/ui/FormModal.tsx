


import type { ReactNode } from 'react';
import { X, SaveIcon, RefreshCcwDot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface FormModalProps {
    isOpen: boolean;
    isPending?: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    title: string;
    submitLabel: string;
    isEdit?: boolean; 
    children: ReactNode; 
    submitIcon?: ReactNode; 
}

export const FormModal = ({ isOpen, isPending, onClose, onSubmit, title, submitLabel, isEdit = false, children, submitIcon}: FormModalProps) => {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="modal-overlay">
                <motion.div
                        className="modal"
                        initial={{ opacity: 0, scale: 0.7, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}>
                            
                    <div className="header_model flex_between_center">
                        <h2 className="text text_xxl weight_600">{title}</h2>
                        <button className="btn_icon" type="button" onClick={onClose}><X /></button>
                    </div>

                    <form onSubmit={onSubmit}>
                        
                        <div className="body_model scroll">{children}</div>

                        <div className="footer_model flex_end_center gap_12 row">
                            <button type="button" onClick={onClose} className="btn secondary md col_2">
                                 <div className="text text_md weight_600"> {t('common.cancel')} </div>
                            </button>
                            <button type="submit" className="btn primary md col_2">

                                {isPending ? (
                                    <span className="btn_loader"></span>
                                ) : (
                                    <>
                                        {submitIcon || (isEdit ? <RefreshCcwDot size={16} /> : <SaveIcon size={16} />)}
                                        <div className="text text_md weight_600">{submitLabel}</div>
                                    </>
                                )}
                                
                            </button>
                        </div>
                    
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );

};





