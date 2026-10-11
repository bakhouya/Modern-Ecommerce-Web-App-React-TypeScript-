import { useEffect, useRef, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import type { OfferVariantTypes, ProductDetailTypes } from '../types/offersTypes';
import { emptyVariant, TOTAL_STEPS } from '../constants/constantsOffer';
import { createOffersHooks, useOffer } from '../controllers/useOffer';
import { usePublicProducts } from '../controllers/usePublicProducts';
import { useFieldText } from './useFieldText';
import type { ConditionType, DiscountType,  Variant } from '../widgets/dashboard/offers/types';
import { offerSchema } from '../validations/offerSchema';
import { useFieldCheckbox } from './useFieldCheckbox';
import { useFieldFile } from './useFieldFile';
import ROUTES from '../routers/dashboard/path';
import { handleBackendErrors } from '../helpers/handleValidationErrors';

export const useOfferForm = () => {
  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  /*------------------------------------------------------------------------------------------- */


  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  const { data: offerData, isLoading: isFetching } = useOffer(id!);
  const { useCreate, useUpdate } = createOffersHooks(t);
  const createMutation = useCreate();
  const updateMutation = useUpdate();
  const { data: products = [], isLoading: productsLoading, error: productsError } = usePublicProducts();
  /*------------------------------------------------------------------------------------------- */

  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  const form = useFieldText(offerSchema, {
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      min_order_price: '',
      discount_fixed_amount: '',
      discount_percentage: '',
      condition_type: 'PRICE' as ConditionType,
      discount_type: 'FIXED' as DiscountType,
      variants: '[]',
      products: '[]',
  });
  /*------------------------------------------------------------------------------------------- */

  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  const status = useFieldCheckbox({schema: offerSchema.shape.status, initialValue: true, fieldName: 'status'});
  const image = useFieldFile({ multiple: false, required: false, maxSize: 2 });
  /*------------------------------------------------------------------------------------------- */


  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  const [step, setStep]                       = useState(1);
  const [showAddVariant, setShowAddVariant]   = useState(false);
  const [newVariant, setNewVariant]           = useState<Variant>(emptyVariant(0));
  const [variantsError, setVariantsError]     = useState('');
  /*------------------------------------------------------------------------------------------- */

  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  const formValuesRef = useRef(form.values);
  useEffect(() => {formValuesRef.current = form.values;}, [form.values]);
  /*------------------------------------------------------------------------------------------- */



  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  const isPrice = form.values.condition_type === 'PRICE';
  const isFixed = form.values.discount_type === 'FIXED';
  /*------------------------------------------------------------------------------------------- */


  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  const getVariants = (): Variant[] => {try { return JSON.parse(form.values.variants || '[]'); } catch { return []; }};
  const setVariants = (newVariants: Variant[]) => {form.handleChange('variants', JSON.stringify(newVariants));};

  const getProducts = (): string[] => {try { return JSON.parse(form.values.products || '[]'); } catch { return []; }};
  const setProducts = (newProducts: string[]) => {form.handleChange('products', JSON.stringify(newProducts));};
  /*------------------------------------------------------------------------------------------- */

  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  const addVariant = useCallback(() => {
      if (newVariant.min_order_pieces <= 0) {
        setVariantsError(t('offer.form.minPiecesRequired'));
        return;
      }
      const valid = isFixed
        ? !!newVariant.discount_fixed_amount && parseFloat(newVariant.discount_fixed_amount) > 0
        : !!newVariant.discount_percentage && parseFloat(newVariant.discount_percentage) > 0 && parseFloat(newVariant.discount_percentage) <= 100;
      if (!valid) {
        setVariantsError(t('offer.form.invalidDiscount'));
        return;
      }
      const current = getVariants();
      if (current.some((v) => v.min_order_pieces === newVariant.min_order_pieces)) {
        setVariantsError(t('offer.form.duplicateMinPieces'));
        return;
      }
      setVariants([...current, { ...newVariant }]);
      setNewVariant(emptyVariant((current.length + 1) * 2));
      setVariantsError('');
      setShowAddVariant(false);
  }, [newVariant, isFixed, t, getVariants, setVariants]);
  /*------------------------------------------------------------------------------------------- */

  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  const removeVariant = useCallback((index: number) => {
      const current = getVariants();
      setVariants(current.filter((_, i) => i !== index));
  }, [getVariants, setVariants]);
  /*------------------------------------------------------------------------------------------- */


  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  const validateStep = useCallback((): boolean => {
    form.setErrors({});

    if (step === 3) {
      if (!form.values.title.trim()) {
        form.setErrors({ title: t('validation.required') });
        return false;
      }
      if (!form.values.start_date) {
        form.setErrors({ start_date: t('validation.required') });
        return false;
      }
      if (!form.values.end_date) {
        form.setErrors({ end_date: t('validation.required') });
        return false;
      }
      if (new Date(form.values.start_date) >= new Date(form.values.end_date)) {
        form.setErrors({ end_date: t('offer.form.endDateAfterStart') });
        return false;
      }
    }

    if (step === 4) {
      if (isPrice) {
        if (!form.values.min_order_price || parseFloat(form.values.min_order_price) <= 0) {
          form.setErrors({ min_order_price: t('validation.greaterThanZero') });
          return false;
        }
        const field = isFixed ? 'discount_fixed_amount' : 'discount_percentage';
        const value = isFixed ? form.values.discount_fixed_amount : form.values.discount_percentage;
        if (!value || (isFixed ? parseFloat(value) <= 0 : (parseFloat(value) <= 0 || parseFloat(value) > 100))) {
          form.setErrors({ [field]: t('offer.form.invalidDiscount') });
          return false;
        }
      } else {
        const variants = getVariants();
        if (variants.length === 0) {
          setVariantsError(t('offer.form.variantRequired'));
          return false;
        }
        for (const v of variants) {
          if (v.min_order_pieces <= 0) {
            setVariantsError(t('offer.form.minPiecesRequired'));
            return false;
          }
          const valid = isFixed
            ? !!v.discount_fixed_amount && parseFloat(v.discount_fixed_amount) > 0
            : !!v.discount_percentage && parseFloat(v.discount_percentage) > 0 && parseFloat(v.discount_percentage) <= 100;
          if (!valid) {
            setVariantsError(t('offer.form.invalidDiscount'));
            return false;
          }
        }
        setVariantsError('');
      }
    }
    return true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, isPrice, isFixed, form, t]);
  /*------------------------------------------------------------------------------------------- */


  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  const goNext = useCallback(() => {if (validateStep() && step < TOTAL_STEPS) setStep(step + 1);}, [validateStep, step]);
  /*------------------------------------------------------------------------------------------- */

  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  const goPrev = useCallback(() => {if (step > 1) setStep(step - 1);}, [step]);
  /*------------------------------------------------------------------------------------------- */


  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  const formatDateForInput = (dateString?: string): string => {
      if (!dateString) return '';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  /*------------------------------------------------------------------------------------------- */


  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  useEffect(() => {
    if (isEdit && offerData) {
      const offer = offerData;
      form.handleChange('title', offer.title || '');
      form.handleChange('description', offer.description || '');
      form.handleChange('start_date', formatDateForInput(offer.start_date));
      form.handleChange('end_date', formatDateForInput(offer.end_date));
      form.handleChange('min_order_price', offer.min_order_price?.toString() || '');
      form.handleChange('discount_fixed_amount', offer.discount_fixed_amount?.toString() || '');
      form.handleChange('discount_percentage', offer.discount_percentage?.toString() || '');
      form.handleChange('condition_type', offer.condition_type || 'PRICE');
      form.handleChange('discount_type', offer.discount_type || 'FIXED');

      status.onChange(offer.status ?? true);

      if (offer.variants) {
        const mapped = offer.variants .map((v: OfferVariantTypes) => ({
          min_order_pieces: v.min_order_pieces,
          discount_fixed_amount: v.discount_fixed_amount ?? '',
          discount_percentage: v.discount_percentage ?? '',
        }));
        setVariants(mapped);
      }

      if (offer.products_detials) {
        const ids = offer.products_detials.map((p: ProductDetailTypes) => String(p.id));
        setProducts(ids);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, offerData]);
  /*------------------------------------------------------------------------------------------- */


  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateStep()) return;

      const currentValues = formValuesRef.current;
      const formData = new FormData();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = { ...currentValues };
      if (payload.variants !== undefined) {
        payload.offer_variant = payload.variants;
        delete payload.variants;
      }

      if (payload.condition_type === 'PRICE') {
        delete payload.offer_variant;
      }

      // 2. Simple fields
      Object.entries(payload).forEach(([key, value]) => {
        if (key === 'products' || key === 'offer_variant') return;
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, String(value));
        }
      });

      // 3. Products (each ID separately)
      const productsArray = JSON.parse(payload.products || '[]');
      if (Array.isArray(productsArray) && productsArray.length > 0) {
        productsArray.forEach((productId: string) => {
          formData.append('products', productId);
        });
      }

      // 4. Offer_variant as JSON string
      // if (payload.offer_variant !== undefined && payload.condition_type !== 'PRICE') {
      //   try {
      //     const variantArray = JSON.parse(payload.offer_variant);
      //     if (Array.isArray(variantArray) && variantArray.length > 0) {
      //       formData.append('offer_variant', JSON.stringify(variantArray));
      //     }
      //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //   } catch (_) { /* ignore */  }
      // }
      if (payload.offer_variant !== undefined && payload.condition_type !== 'PRICE') {
          const variantArray = JSON.parse(payload.offer_variant);
          formData.append('offer_variant', JSON.stringify(variantArray));
      } else if (payload.condition_type !== 'PRICE') {
          formData.append('offer_variant', '[]');
      }

      // 5. Fix dates (add :00 seconds)
      const fixDateTime = (dateStr: string): string => {
        if (!dateStr) return dateStr;
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dateStr)) {
          return dateStr + ':00';
        }
        return dateStr;
      };

      const start = formData.get('start_date');
      if (start) formData.set('start_date', fixDateTime(start.toString()));
      const end = formData.get('end_date');
      if (end) formData.set('end_date', fixDateTime(end.toString()));

      // 6. Status & image
      formData.append('status', String(status.value));
      if (image.files && image.files[0]) {formData.append('image', image.files[0]);}

      console.log('📦 FormData entries:', Array.from(formData.entries()));
      const onSuccess = () => navigate(ROUTES.OFFERS);
      const onError = (error: unknown) => {
        if (axios.isAxiosError(error) && error.response) {
          console.log('🔴 Backend errors:', error.response.data);
        }
        handleBackendErrors(error, (errors: React.SetStateAction<Record<string, string>>) => form.setErrors(errors));
      };

      if (isEdit) {
        updateMutation.mutate({ id: id!, data: formData }, { onSuccess, onError });
      } else {
        createMutation.mutate(formData, { onSuccess, onError });
      }
    },
    [validateStep, isEdit, id, updateMutation, createMutation, form, status.value, image.files, navigate]
  );
  /*------------------------------------------------------------------------------------------- */

  /*------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------- */
  return {
    // States
    form,
    status,
    image,
    step,
    setStep,
    isEdit,
    isFetching,
    createMutation,
    updateMutation,
    products,
    productsLoading,
    productsError,
    // Computed
    isPrice,
    isFixed,
    // Variants
    getVariants,
    setVariants,
    getProducts,
    setProducts,

    addVariant,
    removeVariant,

    showAddVariant,
    setShowAddVariant,
    newVariant,
    setNewVariant,
    variantsError,
    setVariantsError,
    // Navigation
    goNext,
    goPrev,
    // Submit
    handleSubmit,
    // Helpers
    formatDateForInput,
    offerData,
  };
  /*------------------------------------------------------------------------------------------- */

};



