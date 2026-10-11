// import React, { useState, useEffect, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { FileUploader } from '../../../../components/forms/FileUploader';
// import InputText from '../../../../components/forms/InputText';
// import { Textarea } from '../../../../components/forms/Textarea';
// import { Checkbox } from '../../../../components/forms/Checkbox';
// import { SectionHeader } from '../../../../components/ui/SectionHeader';
// import { offerSchema } from '../../../../validations/offerSchema';
// import { useFieldText } from '../../../../hooks/useFieldText';
// import { useFieldCheckbox } from '../../../../hooks/useFieldCheckbox';
// import { useFieldFile } from '../../../../hooks/useFieldFile';
// import { SelectCardsGroup } from '../../../../components/forms/SelectCardsGroup';
// import { conditionItems, discountItems } from '../../../../models/offers/optionals';
// import { ChevronLeft, ChevronRight, X } from 'lucide-react';
// import { createOffersHooks, useOffer } from '../../../../controllers/useOffer';
// import { handleBackendErrors } from '../../../../helpers/handleValidationErrors';
// import { usePublicProducts } from '../../../../controllers/usePublicProducts';
// import type { Product } from '../../../../services/products/productServices';
// import ROUTES from '../../../../routers/dashboard/path';
// import type { OfferVariantTypes, ProductDetailTypes } from '../../../../types/offersTypes';
// import { LoadingDisplay } from '../../../../components/ui/LoadingDisplay';
// import axios from 'axios';

// type ConditionType = 'PRICE' | 'QUANTITY';
// type DiscountType = 'FIXED' | 'PERCENTAGE';

// type Variant = {
//     min_order_pieces: number;
//     discount_fixed_amount: string;
//     discount_percentage: string;
// };

// const emptyVariant = (min_order_pieces: number): Variant => ({
//     min_order_pieces,
//     discount_fixed_amount: '',
//     discount_percentage: '',
// });

// const TOTAL_STEPS = 5;

// export const OfferFormPage = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const isEdit = Boolean(id);

//   const { data: offerData, isLoading: isFetching } = useOffer(id!);
//   const { useCreate, useUpdate } = createOffersHooks(t);
//   const createMutation = useCreate();
//   const updateMutation = useUpdate();

//   const { data: products = [], isLoading: productsLoading, error: productsError } = usePublicProducts();


//   const form = useFieldText(offerSchema, {
//       title: '',
//       description: '',
//       start_date: '',
//       end_date: '',
//       min_order_price: '',
//       discount_fixed_amount: '',
//       discount_percentage: '',
//       condition_type: 'PRICE' as ConditionType,
//       discount_type: 'FIXED' as DiscountType,
//       variants: '[]',     
//       products: '[]',    
//   });
//   const status = useFieldCheckbox({schema: offerSchema.shape.status, initialValue: true, fieldName: 'status'});
//   const image = useFieldFile({ multiple: false, required: false, maxSize: 2 });


//   const [showAddVariant, setShowAddVariant] = useState(false);
//   const [newVariant, setNewVariant] = useState<Variant>(emptyVariant(2));
//   const [variantsError, setVariantsError] = useState('');
//   const [step, setStep] = useState(1);

//   const formValuesRef = useRef(form.values);
//   useEffect(() => {formValuesRef.current = form.values;}, [form.values]);


//   const isPrice = form.values.condition_type === 'PRICE';
//   const isFixed = form.values.discount_type === 'FIXED';

//   const getVariants = (): Variant[] => { try { return JSON.parse(form.values.variants || '[]'); } catch { return []; }};
//   const setVariants = (newVariants: Variant[]) => {form.handleChange('variants', JSON.stringify(newVariants));};

//   const getProducts = (): string[] => {try { return JSON.parse(form.values.products || '[]'); } catch { return []; }};
//   const setProducts = (newProducts: string[]) => {form.handleChange('products', JSON.stringify(newProducts));};


//   const isDiscountValid = (fixed: string, percentage: string) => {
//     if (isFixed) return !!fixed && parseFloat(fixed) > 0;
//     const p = parseFloat(percentage);
//     return !!percentage && p > 0 && p <= 100;
//   };

//   const addVariant = () => {
//       if (newVariant.min_order_pieces <= 0) {
//           setVariantsError(t('offer.form.minPiecesRequired'));
//           return;
//       }
//       if (!isDiscountValid(newVariant.discount_fixed_amount, newVariant.discount_percentage)) {
//           setVariantsError(t('offer.form.invalidDiscount'));
//           return;
//       }
//       const current = getVariants();
//       if (current.some((v) => v.min_order_pieces === newVariant.min_order_pieces)) {
//           setVariantsError(t('offer.form.duplicateMinPieces'));
//           return;
//       }
//       setVariants([...current, { ...newVariant }]);
//       setNewVariant(emptyVariant((current.length + 1) * 2));
//       setVariantsError('');
//       setShowAddVariant(false);
//   };

//   const removeVariant = (index: number) => {
//       const current = getVariants();
//       setVariants(current.filter((_, i) => i !== index));
//   };

//   const handleProductToggle = (productId: string) => {
//       const current = getProducts();
//       const next = current.includes(productId)
//         ? current.filter((p) => p !== productId)
//         : [...current, productId];
//       setProducts(next);
//   };

//   // --- Validation par étape ---
//   const validateStep = (): boolean => {
//       form.setErrors({});

//       if (step === 3) {

//           if (!form.values.title.trim()) {
//               form.setErrors({ title: t('validation.required') });
//               return false ;
//           }
//           if (!form.values.start_date) {
//               form.setErrors({ start_date: t('validation.required') });
//               return false ;
//           }
//           if (!form.values.end_date) {
//             form.setErrors({ end_date: t('validation.required') });
//             return false;
//           }
//           if (new Date(form.values.start_date) >= new Date(form.values.end_date)) {
//             form.setErrors({ end_date: t('offer.form.endDateAfterStart') });
//             return false;
//           }

//       }

//       if (step === 4) {
//         if (isPrice) {
//           if (!form.values.min_order_price || parseFloat(form.values.min_order_price) <= 0) {
//             form.setErrors({ min_order_price: t('validation.greaterThanZero') });
//             return false;
//           }
//           if (!isDiscountValid(form.values.discount_fixed_amount, form.values.discount_percentage)) {
//             const field = isFixed ? 'discount_fixed_amount' : 'discount_percentage';
//             form.setErrors({ [field]: t('offer.form.invalidDiscount') });
//             return false;
//           }
//         } else {
//           const variants = getVariants();
//           if (variants.length === 0) {
//             setVariantsError(t('offer.form.variantRequired'));
//             return false;
//           }
//           for (const v of variants) {
//             if (v.min_order_pieces <= 0) {
//               setVariantsError(t('offer.form.minPiecesRequired'));
//               return false;
//             }
//             if (!isDiscountValid(v.discount_fixed_amount, v.discount_percentage)) {
//               setVariantsError(t('offer.form.invalidDiscount'));
//               return false;
//             }
//           }
//           setVariantsError('');
//         }
//       }
//       return true ;

//   };


//   const goNext = () => { if (validateStep() && step < TOTAL_STEPS) setStep(step + 1); };
//   const goPrev = () => { if (step > 1) setStep(step - 1); };


//   const formatDateForInput = (dateString?: string): string => {
//         if (!dateString) return '';
//         const date = new Date(dateString);
//         if (isNaN(date.getTime())) return '';
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         const hours = String(date.getHours()).padStart(2, '0');
//         const minutes = String(date.getMinutes()).padStart(2, '0');
//         return `${year}-${month}-${day}T${hours}:${minutes}`;
//   };


//   useEffect(() => {
//     if (isEdit && offerData) {
//       const offer = offerData;
//       form.handleChange('title', offer.title || '');
//       form.handleChange('description', offer.description || '');
//       form.handleChange('start_date', formatDateForInput(offer.start_date));
//       form.handleChange('end_date', formatDateForInput(offer.end_date));
//       form.handleChange('min_order_price', offer.min_order_price?.toString() || '');
//       form.handleChange('discount_fixed_amount', offer.discount_fixed_amount?.toString() || '');
//       form.handleChange('discount_percentage', offer.discount_percentage?.toString() || '');
//       form.handleChange('condition_type', offer.condition_type || 'PRICE');
//       form.handleChange('discount_type', offer.discount_type || 'FIXED');

//       status.onChange(offer.status ?? true);

//       if (offer.variants) {
//         const mappedVariants = offer.variants.map((v: OfferVariantTypes) => ({
//           min_order_pieces: v.min_order_pieces,
//           discount_fixed_amount: v.discount_fixed_amount ?? '',
//           discount_percentage: v.discount_percentage ?? '',
//         }));
//         setVariants(mappedVariants);
//       }

//       if (offer.products_detials) {
//         const productIds = offer.products_detials.map((p: ProductDetailTypes) => String(p.id));
//         setProducts(productIds);
//       }
//     }
//   }, [isEdit, offerData]);

//   const handleSubmit = (e: React.FormEvent) => {
//       e.preventDefault();
//       if (!validateStep()) return;

//       const currentValues = formValuesRef.current;
//       const formData = new FormData();

//       // 1. Renommer 'variants' -> 'offer_variant'
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const payload: any = { ...currentValues };
//       if (payload.variants !== undefined) {
//         payload.offer_variant = payload.variants;
//         delete payload.variants;
//       }

//       // Si condition_type === 'PRICE', on supprime offer_variant
//       if (payload.condition_type === 'PRICE') {
//         delete payload.offer_variant;
//       }

//       // 2. Ajout des champs simples (sauf products et offer_variant)
//       Object.entries(payload).forEach(([key, value]) => {
//         if (key === 'products' || key === 'offer_variant') return;
//         if (value !== undefined && value !== null && value !== '') {
//           formData.append(key, String(value));
//         }
//       });

//       // 3. Products : on envoie chaque ID sous la même clé 'products'
//      const productsArray = JSON.parse(payload.products || '[]');
//       if (Array.isArray(productsArray) && productsArray.length > 0) {
//         productsArray.forEach((productId: string) => {
//           formData.append('products', productId);
//         });
//       }


//       if (payload.offer_variant !== undefined && payload.condition_type !== 'PRICE') {
//          const variantArray = JSON.parse(payload.offer_variant);
//           formData.append('offer_variant', JSON.stringify(variantArray));
//       } else if (payload.condition_type !== 'PRICE') {
//           formData.append('offer_variant', '[]');
//       }

//       // 5. Fix des dates (ajout de :00 pour les secondes)
//       const fixDateTime = (dateStr: string): string => {
//         if (!dateStr) return dateStr;
//         if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dateStr)) {
//           return dateStr + ':00';
//         }
//         return dateStr;
//       };

//       const startDate = formData.get('start_date');
//       if (startDate) formData.set('start_date', fixDateTime(startDate.toString()));
//       const endDate = formData.get('end_date');
//       if (endDate) formData.set('end_date', fixDateTime(endDate.toString()));

//       // 6. Status et image
//       formData.append('status', String(status.value));
//       if (image.files && image.files[0]) {
//         formData.append('image', image.files[0]);
//       }

//       console.log('📦 FormData entries:', Array.from(formData.entries()));

//       const onSuccess = () => navigate(ROUTES.OFFERS);

//       const onError = (error: unknown) => {
//         if (axios.isAxiosError(error) && error.response) {
//           console.log('🔴 Backend errors:', error.response.data);
//         }
//         handleBackendErrors(error, (errors: React.SetStateAction<Record<string, string>>) => form.setErrors(errors));
//       };

//       if (isEdit) {
//         updateMutation.mutate({ id: id!, data: formData }, { onSuccess, onError });
//       } else {
//         createMutation.mutate(formData, { onSuccess, onError });
//       }
//     };


//   if (isEdit && isFetching) {
//     return <LoadingDisplay /> ;
//   }

//   const stepTitles = [
//     t('offer.form.conditionType'),
//     t('offer.form.discountType'),
//     t('offer.form.basicInfo'),
//     isPrice ? t('offer.form.discountRules') : t('offer.form.variants'),
//     t('models.product.plural'),
//   ];
//   const desc = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';

//   // ------------------------------------------------------------
//   // Rendu
//   // ------------------------------------------------------------
//   return (
//     <div className="wrapper_page">



//       <aside className="nav_container">
//         <div className="scroll">
//           <div className="flex_start_center gap_12 my_end_12">
//             <Link to={ROUTES.OFFERS} className="btn_icon bg_base md"> 
//               <ChevronLeft size={19} />
//             </Link>
//             <div className="text text_xl"> Étapes Création </div>
//           </div>
            
//           <div className="divider my_8"></div>
//           <div className="etaps_items">
//             {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
//               <button
//                 key={s}
//                 type="button"
//                 className={`etaps_item ${s === step ? 'active' : ''} ${s < step ? 'completed' : ''}`}
//                 onClick={() => setStep(s)}
//               >
//                 <div className="flex_start_center gap_12">
//                   <span className="etaps_number">{s}</span>
//                   <div className="text text_md weight_500">{stepTitles[s - 1]}</div>
//                 </div>
//                 {s < step && <span className="text text_lg etaps_check">✓</span>}
//               </button>
//             ))}
//           </div>
//         </div>
//       </aside>

//       <main className="flex_container">
//         <form onSubmit={handleSubmit} className="offer-form-content">
//           <div className="wraaper_form_page">
//             {/* Étape 1 : Type de condition */}
//             {step === 1 && (
//               <div>
//                 <SectionHeader title={t('offer.form.conditionType')} description={desc} />
//                 <div className="divider my_8"></div>
//                 <SelectCardsGroup
//                   items={conditionItems}
//                   selectedValue={form.values.condition_type}
//                   onSelect={(value) => form.handleChange('condition_type', value)}
//                 />
//               </div>
//             )}

//             {/* Étape 2 : Type de réduction */}
//             {step === 2 && (
//               <div>
//                 <SectionHeader title={t('offer.form.discountType')} description={desc} />
//                 <div className="divider my_8"></div>
//                 <SelectCardsGroup
//                   items={discountItems}
//                   selectedValue={form.values.discount_type}
//                   onSelect={(value) => form.handleChange('discount_type', value)}
//                 />
//               </div>
//             )}

//             {/* Étape 3 : Informations générales */}
//             {step === 3 && (
//               <div className="block_form">
//                 <SectionHeader title={t('offer.form.basicInfo')} description={desc} />
//                 <div className="divider my_start_8 my_end_15"></div>
//                 <div>
//                   <div>
//                     <FileUploader
//                       key={isEdit ? 'edit' : 'new'}
//                       label={t('fields.image')}
//                       previews={image.previews}
//                       initialPreviews={isEdit && offerData?.image ? [offerData.image] : []}
//                       error={image.error}
//                       onAddFiles={image.addFiles}
//                       onRemoveFile={image.removeFile}
//                     />
//                   </div>
//                   <div className="box_input">
//                     <InputText
//                       type="text"
//                       label={t('fields.title')}
//                       value={form.values.title}
//                       onChange={(e) => form.handleChange('title', e.target.value)}
//                       error={form.errors.title}
//                     />
//                   </div>
//                   <div className="box_input">
//                     <Textarea
//                       label={t('fields.description')}
//                       value={form.values.description}
//                       onChange={(e) => form.handleChange('description', e.target.value)}
//                       error={form.errors.description}
//                       rows={4}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="box_input">
//                     <InputText
//                       type="datetime-local"
//                       label={t('offer.form.startDate')}
//                       value={form.values.start_date}
//                       onChange={(e) => form.handleChange('start_date', e.target.value)}
//                       error={form.errors.start_date}
//                     />
//                   </div>
//                   <div className="box_input">
//                     <InputText
//                       type="datetime-local"
//                       label={t('offer.form.endDate')}
//                       value={form.values.end_date}
//                       onChange={(e) => form.handleChange('end_date', e.target.value)}
//                       error={form.errors.end_date}
//                     />
//                   </div>
//                   <div className="my_start_15">
//                     <Checkbox
//                       label={t('fields.status')}
//                       desc={t('policy.form.statusDesc')}
//                       checked={status.value}
//                       onChange={status.onChange}
//                       error={status.error}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Étape 4 : Règles de réduction ou Variants */}
//             {step === 4 && (
//               <div className="block_form">
//                 <div className="flex_between_center">
//                   <SectionHeader
//                     title={isPrice ? t('offer.form.discountRules') : t('offer.form.variants')}
//                     description={desc}
//                   />
//                   {!isPrice && (
//                     <button type="button" className="btn lg primary" onClick={() => setShowAddVariant((prev) => !prev)}>
//                       <div className="text text_md"> Ajouter Variant </div>
//                     </button>
//                   )}
//                 </div>
//                 <div className="divider my_end_15"></div>
//                 {isPrice ? (
//                   <>
//                     <div className="box_input">
//                       <InputText
//                         type="number"
//                         label={t('offer.form.minOrderPrice')}
//                         value={form.values.min_order_price}
//                         onChange={(e) => form.handleChange('min_order_price', e.target.value)}
//                         error={form.errors.min_order_price}
//                       />
//                     </div>
//                     {isFixed ? (
//                       <div className="box_input">
//                         <InputText
//                           type="number"
//                           label={t('offer.form.discountFixedAmount')}
//                           value={form.values.discount_fixed_amount}
//                           onChange={(e) => form.handleChange('discount_fixed_amount', e.target.value)}
//                           error={form.errors.discount_fixed_amount}
//                         />
//                       </div>
//                     ) : (
//                       <div className="box_input">
//                         <InputText
//                           type="number"
//                           label={t('offer.form.discountPercentage')}
//                           value={form.values.discount_percentage}
//                           onChange={(e) => form.handleChange('discount_percentage', e.target.value)}
//                           error={form.errors.discount_percentage}
//                         />
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <>
//                     {showAddVariant && (
//                       <div className="modal-overlay">
//                         <div className="modal-card p_12">
//                           <div className="text text_xxl"> {t('offer.form.variants')} </div>
//                           <div className="divider my_start_12 my_end_15"></div>
//                           <div className="box_input">
//                             <InputText
//                               type="number"
//                               label="Min pieces"
//                               value={String(newVariant.min_order_pieces)}
//                               onChange={(e) => setNewVariant((prev) => ({...prev, min_order_pieces: parseInt(e.target.value, 10) || 0,}))}
//                               error=""
//                             />
//                           </div>
//                           {isFixed ? (
//                             <div className="box_input">
//                               <InputText
//                                 type="number"
//                                 label="Fixed amount"
//                                 value={newVariant.discount_fixed_amount}
//                                 onChange={(e) =>setNewVariant((prev) => ({...prev, discount_fixed_amount: e.target.value, }))}
//                                 error=""
//                               />
//                             </div>
//                           ) : (
//                             <div className="box_input">
//                               <InputText
//                                 type="number"
//                                 label="Percentage"
//                                 value={newVariant.discount_percentage}
//                                 onChange={(e) => setNewVariant((prev) => ({...prev, discount_percentage: e.target.value,}))}
//                                 error=""
//                               />
//                             </div>
//                           )}
//                           <div className="flex_end_center gap_10 my_start_20">
//                             <button type="button" className="btn md secondary" onClick={() => setShowAddVariant(false)}>
//                               <div className="text text_sm">{t('common.cancel')}</div>
//                             </button>
//                             <button type="button" className="btn md primary" onClick={addVariant}>
//                               <div className="text text_sm">{t('common.save')}</div>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                     {variantsError && <div className="offer-form-error">{variantsError}</div>}
//                     <div className="check_cards">
//                       {getVariants().map((v, idx) => (
//                         <div key={idx} className="check_item_card p_add">
//                           <div className="flex_start_center gap_12">
//                             <span>
//                               <span className="text text_md">Min pieces:</span> 
//                               <span className="text text_md text_primary"> {v.min_order_pieces}  </span>
//                             </span>
//                             <span>
//                               {isFixed ? (
//                                 <>
//                                 <span>
//                                    <span className="text text_md">Fixed:</span> 
//                                    <span className="text text_md text_primary"> {v.discount_fixed_amount}Dh  </span>
//                                 </span>
                                  
//                                 </>
//                               ) : (
//                                 <>
//                                 <span>
//                                    <span className="text text_md">Percentage:</span> 
//                                    <span className="text text_md text_primary"> {v.discount_percentage}%  </span>
//                                 </span>
                           
//                                 </>
//                               )}
//                             </span>
//                           </div>
//                           <button type="button" className="btn_icon border sm" onClick={() => removeVariant(idx)}>
//                              <X size={18} className='text text_sm'/>
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {/* Étape 5 : Sélection des produits */}
//             {step === 5 && (
//               <div className="offer-form-card">
//                 <SectionHeader title={t('models.product.plural')} description={desc} />
//                 {/* <div className="divider my_end_15"></div> */}
//                 <div className="offer-form-field">
//                   {productsLoading ? (
//                       <LoadingDisplay />
//                   ) : productsError ? (
//                     <div>Error loading products</div>
//                   ) : (
//                     <div className="check_cards">
//                       {products.map((product: Product) => (

//                         <label key={product.id} htmlFor={product.id} className="check_item_card">
//                           <div className="flex_between_center">
//                               <div className="flex_start_center gap_12">
//                                 {product?.image[0]?.image 
//                                 ? <div className="image_sm"> <img src={product?.image[0]?.image} alt={product.title} /> </div> 
//                                 : <div className="image_sm text text_lg"> L </div>}
//                                 <div className="">
//                                     <div className="text text_md"> {product.title} </div>
//                                     <div className="flex_start_center gap_12">
//                                         <div className="text text_sm"> {product.price_sale} MAD </div>
//                                         <div className="slash"></div>
//                                         <div className="text text_sm"> Stock: {product.stock} </div>
//                                     </div>
//                                 </div>
//                               </div>

//                               <label className="switch" htmlFor={product.id}>
//                                 <input
//                                       type="checkbox"
//                                       id={product.id}
//                                       checked={getProducts().includes(product.id)} 
//                                       onChange={() => handleProductToggle(product.id)}/>
//                                   <span className="slider round"></span>
//                               </label>
//                           </div>
//                         </label>

//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Navigation */}
//           <div className="offer-form-nav flex_center_center gap_15">
//             <button type="button" className="btn lg secondary" onClick={goPrev} disabled={step === 1}>
//               <ChevronLeft size={20} />
//               <div className="text text_md"> {t('common.back')} </div>
//             </button>

//             {step < TOTAL_STEPS ? (
//               <button type="button" className="btn lg secondary" onClick={goNext}>
//                 <div className="text text_md"> {t('common.next')} </div>
//                 <ChevronRight size={20} />
//               </button>
//             ) : (
//               <button type="submit" className="btn lg primary" disabled={createMutation.isPending || updateMutation.isPending || isFetching}>
//                 <div className="text text_md">
//                   {createMutation.isPending || updateMutation.isPending
//                     ? t('common.saving')
//                     : isEdit
//                     ? t('common.update')
//                     : t('common.create')}
//                 </div>
//               </button>
//             )}
//           </div>
//         </form>
//       </main>



//     </div>
//   );
// };


import { LoadingDisplay } from '../../../../components/ui/LoadingDisplay';
import { useTranslation } from 'react-i18next';
import { useOfferForm } from '../../../../hooks/useOfferForm';
import { StepsNavigation } from '../../../../widgets/dashboard/offers/StepsNavigation';
import { ConditionStep } from '../../../../widgets/dashboard/offers/steps/ConditionStep';
import { DiscountStep } from '../../../../widgets/dashboard/offers/steps/DiscountStep';
import { BasicInfoStep } from '../../../../widgets/dashboard/offers/steps/BasicInfoStep';
import { RulesStep } from '../../../../widgets/dashboard/offers/steps/RulesStep';
import { ProductsStep } from '../../../../widgets/dashboard/offers/steps/ProductsStep';
import { NavigationButtons } from '../../../../widgets/dashboard/offers/NavigationButtons';



export const OfferFormPage = () => {
  const { t } = useTranslation();

  const {
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
    isPrice,
    isFixed,
    getVariants,
    // setVariants,
    getProducts,
    setProducts,
    showAddVariant,
    setShowAddVariant,
    newVariant,
    setNewVariant,
    variantsError,
    // setVariantsError,
    addVariant,
    removeVariant,
    goNext,
    goPrev,
    handleSubmit,
    offerData,
  } = useOfferForm();

  if (isEdit && isFetching) return <LoadingDisplay />;

  const stepTitles = [
    t('offer.form.conditionType'),
    t('offer.form.discountType'),
    t('offer.form.basicInfo'),
    isPrice ? t('offer.form.discountRules') : t('offer.form.variants'),
    t('models.product.plural'),
  ];
  const desc = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';
  const isPending = createMutation.isPending || updateMutation.isPending;

  const initialImage = isEdit && offerData?.image ? offerData.image : undefined;

  return (
    <div className="wrapper_page">
      <StepsNavigation
        step={step}
        totalSteps={5}
        stepTitles={stepTitles}
        onStepClick={setStep}
      />

      <main className="flex_container">
        <form onSubmit={handleSubmit} className="offer-form-content">
          <div className="wraaper_form_page">
            {step === 1 && (
              <ConditionStep
                value={form.values.condition_type}
                onChange={(val) => form.handleChange('condition_type', val)}
                description={desc}
              />
            )}

            {step === 2 && (
              <DiscountStep
                value={form.values.discount_type}
                onChange={(val) => form.handleChange('discount_type', val)}
                description={desc}
              />
            )}

            {step === 3 && (
              <BasicInfoStep
                title={form.values.title}
                description={form.values.description}
                startDate={form.values.start_date}
                endDate={form.values.end_date}
                status={status.value}
                imagePreviews={image.previews}
                initialImage={initialImage} // ✅ الآن من النوع string | undefined
                onTitleChange={(val) => form.handleChange('title', val)}
                onDescChange={(val) => form.handleChange('description', val)}
                onStartDateChange={(val) => form.handleChange('start_date', val)}
                onEndDateChange={(val) => form.handleChange('end_date', val)}
                onStatusChange={status.onChange}
                onImageAdd={image.addFiles} // ✅ الآن النوع متطابق (FileList)
                onImageRemove={image.removeFile}
                errors={form.errors}
                isEdit={isEdit}
                imageError={image.error}
              />
            )}

            {step === 4 && (
              <RulesStep
                isPrice={isPrice}
                isFixed={isFixed}
                minOrderPrice={form.values.min_order_price}
                discountFixed={form.values.discount_fixed_amount}
                discountPercent={form.values.discount_percentage}
                variants={getVariants()}
                showAddVariant={showAddVariant}
                newVariant={newVariant}
                variantsError={variantsError}
                onMinPriceChange={(val) => form.handleChange('min_order_price', val)}
                onFixedChange={(val) => form.handleChange('discount_fixed_amount', val)}
                onPercentChange={(val) => form.handleChange('discount_percentage', val)}
                onAddVariant={addVariant} 
                onRemoveVariant={removeVariant} 
                onVariantModalOpen={() => setShowAddVariant(true)}
                onVariantModalClose={() => setShowAddVariant(false)}
                onNewVariantChange={setNewVariant}
                errors={form.errors}
                description={desc}
              />
            )}

            {step === 5 && (
              <ProductsStep
                products={products}
                selectedIds={getProducts()}
                isLoading={productsLoading}
                error={productsError}
                onToggle={(id) => {
                  const current = getProducts();
                  const next = current.includes(id)
                    ? current.filter((p) => p !== id)
                    : [...current, id];
                  setProducts(next);
                }}
                description={desc}
              />
            )}
          </div>

          <NavigationButtons
            step={step}
            totalSteps={5}
            isPending={isPending}
            isEdit={isEdit}
            onPrev={goPrev}
            onNext={goNext}
            onSubmit={handleSubmit} // ✅ الآن النوع صحيح (e: React.FormEvent) => void
          />
        </form>
      </main>
    </div>
  );
};
