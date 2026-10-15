

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Props { isOpen: boolean; title: string; message: string; onConfirm: () => void; onCancel: () => void;}

export const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }: Props) => {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="modal-overlay">
                <motion.div
                    className="modal small"
                    initial={{ opacity: 0, scale: 0.7, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}>

                    <div className="text text_xl weight_600">{title}</div>
                    <p className="text text_start">{message}</p>

                    <div className="divider"></div> 

                    <div className="modalActions row ">

                      <button onClick={onCancel} className="sm col_2" type="button">
                            <div className="text text_sm weight_600"> {t('common.cancel')}  </div>
                      </button>
                      <button onClick={onConfirm} className="sm col_2" type="button">
                        <div className="text text_sm text_danger weight_600"> {t('common.confirm')} </div>
                      </button>

                    </div>

                </motion.div>
            </div>
        </AnimatePresence>
    );
};

