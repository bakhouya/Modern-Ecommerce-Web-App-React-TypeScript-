

import { useEffect } from 'react';
import { useFieldText } from '../../../hooks/useFieldText';
import { useFieldCheckbox } from '../../../hooks/useFieldCheckbox';
import InputText from '../../../components/forms/InputText';
import { Checkbox } from '../../../components/forms/Checkbox';
import { FormModal } from '../../../components/ui/FormModal';
import { useTranslation } from 'react-i18next';
import { CouponSchema, type CouponFormType } from '../../../validations/couponSchema';
import type { CouponTypes } from '../../../types/couponTypes';

interface Props {
  isOpen        : boolean;
  onClose       : () => void;
  onSave        : (data: CouponFormType, setErrors: (errors: Record<string, string>) => void) => void;
  initialData?  : CouponTypes | null ;
}

export const CouponFormModal = ({ isOpen, onClose, onSave, initialData }: Props) => {
    const { t } = useTranslation();

    const fieldsForm = {
        code: '', discount_percentage: '', 
        max_uses: 0, minimum_cart_total: '', 
        start_date: '', end_date: '' 
    }  
    const form = useFieldText(CouponSchema, fieldsForm);

    const statusField = useFieldCheckbox({
        schema: CouponSchema.shape.status,
        initialValue: true,
        fieldName: 'status',
    });

    useEffect(() => {
        if (initialData) {
            form.setValues({ 
                code                : initialData?.code || '' ,
                discount_percentage : initialData?.discount_percentage || '',
                max_uses            : initialData?.max_uses || '',
                minimum_cart_total  : initialData?.minimum_cart_total || '',
                start_date          : initialData?.start_date || '',
                end_date            : initialData?.end_date || '',
            })
            statusField.setValue(initialData?.status || false);            
        } else {
            form.setValues(fieldsForm)
            statusField.setValue(false);
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.validate()) return;

        const data: CouponFormType = {
            code                : form.values.code,
            discount_percentage : form.values.discount_percentage,
            max_uses            : form.values.max_uses,
            minimum_cart_total  : form.values.minimum_cart_total,
            start_date          : form.values.start_date,
            end_date            : form.values.end_date,
            status              : statusField.value,
        };

        onSave(data, (errors) => form.setErrors(errors));
    };

    const title = initialData 
        ? t('modal.titleEdit', { entity: t('models.coupon.singular') }) 
        : t('modal.titleAdd', { entity: t('models.coupon.singular') });

    if (!isOpen) {
        return null 
        form.setErrors({})
    };

    return (

        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={title}
            submitLabel={initialData ? t('common.update') : t('common.create')}
            isEdit={!!initialData}>

            <div className="box_input">
                <InputText
                    type="text"
                    label={t('fields.coupon_code')}
                    value={form.values.code}
                    onChange={(e) => form.handleChange('code', e.target.value)}
                    error={form.errors.code}
                />
            </div>


            <div className="box_input">
                <InputText
                    type="text"
                    label={t('fields.discount_percentage')}
                    value={form.values.discount_percentage}
                    onChange={(e) => form.handleChange('discount_percentage', e.target.value)}
                    error={form.errors.discount_percentage}
                />
            </div>

            <div className="box_input">
                <InputText
                    type="number"
                    label={t('fields.max_uses')}
                    value={form.values.max_uses}
                    onChange={(e) => form.handleChange('max_uses', e.target.value)}
                    error={form.errors.max_uses}
                />
            </div>

            <div className="box_input">
                <InputText
                    type="text"
                    label={t('fields.minimum_cart_total')}
                    value={form.values.minimum_cart_total}
                    onChange={(e) => form.handleChange('minimum_cart_total', e.target.value)}
                    error={form.errors.minimum_cart_total}
                />
            </div>

            <div className="box_input">
                <InputText
                    type="datetime-local"
                    label={t('fields.start_date')}
                    value={form.values.start_date}
                    onChange={(e) => form.handleChange('start_date', e.target.value)}
                    error={form.errors.start_date}
                />
            </div>

            <div className="box_input">
                <InputText
                    type="datetime-local"
                    label={t('fields.end_date')}
                    value={form.values.end_date}
                    onChange={(e) => form.handleChange('end_date', e.target.value)}
                    error={form.errors.end_date}
                />
            </div>
            
            <div className="my_start_15">
                <Checkbox
                    label={t('fields.status')}
                    desc={t('policy.form.statusDesc')}
                    checked={statusField.value}
                    onChange={statusField.onChange}
                    error={statusField.error}
                />
            </div>

        </FormModal>

    );

};
