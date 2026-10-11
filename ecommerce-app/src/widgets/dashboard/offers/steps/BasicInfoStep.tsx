import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../../../../components/ui/SectionHeader';
import { FileUploader } from '../../../../components/forms/FileUploader';
import InputText from '../../../../components/forms/InputText';
import { Textarea } from '../../../../components/forms/Textarea';
import { Checkbox } from '../../../../components/forms/Checkbox';

interface Props {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: boolean;
  imagePreviews: string[];
  initialImage?: string | null ;
  onTitleChange: (val: string) => void;
  onDescChange: (val: string) => void;
  onStartDateChange: (val: string) => void;
  onEndDateChange: (val: string) => void;
  onStatusChange: (val: boolean) => void;
  onImageAdd: (files: FileList) => void;
  onImageRemove: (index: number) => void;
  errors: Record<string, string>;
  isEdit: boolean;
  imageError?: string;
}

export const BasicInfoStep: React.FC<Props> = ({
  title,
  description,
  startDate,
  endDate,
  status,
  imagePreviews,
  initialImage,
  onTitleChange,
  onDescChange,
  onStartDateChange,
  onEndDateChange,
  onStatusChange,
  onImageAdd,
  onImageRemove,
  errors,
  isEdit,
  imageError,
}) => {
  const { t } = useTranslation();

  return (
    <div className="block_form">
      <SectionHeader title={t('offer.form.basicInfo')} description="..." />
      <div className="divider my_start_8 my_end_15" />

      <div>
        <FileUploader
          key={isEdit ? 'edit' : 'new'}
          label={t('fields.image')}
          previews={imagePreviews}
          initialPreviews={initialImage ? [initialImage] : []}
          error={imageError}
          onAddFiles={onImageAdd}
          onRemoveFile={onImageRemove}
        />
      </div>

      <div className="box_input">
        <InputText
          type="text"
          label={t('fields.title')}
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          error={errors.title}
        />
      </div>

      <div className="box_input">
        <Textarea
          label={t('fields.description')}
          value={description}
          onChange={(e) => onDescChange(e.target.value)}
          error={errors.description}
          rows={4}
        />
      </div>

      <div className="box_input">
        <InputText
          type="datetime-local"
          label={t('offer.form.startDate')}
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          error={errors.start_date}
        />
      </div>

      <div className="box_input">
        <InputText
          type="datetime-local"
          label={t('offer.form.endDate')}
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          error={errors.end_date}
        />
      </div>

      <div className="my_start_15">
        <Checkbox
          label={t('fields.status')}
          desc={t('policy.form.statusDesc')}
          checked={status}
          onChange={onStatusChange}
          error={errors.status}
        />
      </div>
    </div>
  );
};