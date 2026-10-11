
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import WEBROUTES from "../../routers/web/path";
import { ChevronLeftIcon } from "lucide-react";
import { useCart, useCheckout } from "../../controllers/useCart";
import { useFieldSelect } from "../../hooks/useFieldSelect";
import { useFieldText } from "../../hooks/useFieldText";
import type { CartProduct, CheckoutResponse } from "../../types/cartTypes";
import { CheckoutTextSchema, type CheckoutFormType } from "../../validations/checkoutSchema";
import Cities from "../../widgets/dashboard/profiles/Cities";
import { visitorStorage } from "../../context/web/visitorStorage";
import SuccessModal from "../../widgets/web/carts/SuccessModal";
import { useSettings } from "../../context/settings/PublicSettingsContext";
import { Loading } from "../../components/ui/LoadingInset";
import InputText from "../../components/forms/InputText";
import { Textarea } from "../../components/forms/Textarea";

import ImagePlaceholder from '../../assets/images/placeholder_product.png' ;

export default function Checkout() {
    /* --------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------- */
    const { t } = useTranslation();
    const navigate = useNavigate();
    /* --------------------------------------------------------------------------------------------- */
 
    /* --------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------- */
    const fieldsForm                    = {name: "", phone: "",address: "", note: ""};          // initialValue form data (text fields)
    const form                          = useFieldText(CheckoutTextSchema, fieldsForm);         // contract form data with schema validation
    const city                          = useFieldSelect<string | string>({initialValue: '',}); // InitialValue City field
    const [successData, setSuccessData] = useState<CheckoutResponse | null>(null);              // state for checkout sucessfuly
    const checkoutMutation              = useCheckout();
    const {data: cart }                 = useCart();
    const { settingsQuery }             = useSettings();
    const settings                      = settingsQuery.data ;
    /* --------------------------------------------------------------------------------------------- */


    /* --------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------- */
    const handleSubmit = (e: React.FormEvent) => {
        
        e.preventDefault();
        const isFormValid = form.validate();
        const selectedCity = city.value;
        const visitor = visitorStorage.get();
        if (!selectedCity) {city.setError(t("store.checkout.selectCity"));}
        

        if (!isFormValid || !selectedCity || !visitor) {return;}

        const data: CheckoutFormType = {
            name: form.values.name,
            phone: form.values.phone,
            address: form.values.address,
            city: selectedCity,
            note: form.values.note,
            visitor: visitor?.id ,
        };

        checkoutMutation.mutate(data, {
            onSuccess: (response) => {
                toast.success(t("store.checkout.orderSuccess"));
                setSuccessData(response);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                toast.error(t("store.checkout.orderError"));
                const errors = error?.response?.data;
                if (!errors) {return;}
                form.setErrors({
                    name: errors.name?.[0],
                    phone: errors.phone?.[0],
                    address: errors.address?.[0],
                    note: errors.note?.[0],
                });
                if (errors.city) {city.setError(errors.city?.[0]);}
            },
        });

    };
    /* --------------------------------------------------------------------------------------------- */

    /* --------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------- */
    if (!successData && (!cart || cart.products.length === 0)) {
        return (
            <div className="empty_checkout">
                <div className="empty_checkout_content">
                    <div className="empty_checkout_icon">
                        🛒
                    </div>

                    <h2 className="text text_xl"> {t("store.checkout.emptyCartTitle")} </h2>

                    <p className="text text_sm"> {t("store.checkout.emptyCartDescription")} </p>

                    <Link to={WEBROUTES.HOME} type="button" className="btn primary lg mx_auto" onClick={() => navigate(WEBROUTES.HOME)}>
                        {t("store.checkout.backToHome")}
                    </Link>
                </div>
            </div>
        );
    }
    /* --------------------------------------------------------------------------------------------- */


    /* --------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------- */
    return (

        <section className="chechout_page">
            <div className="policies-hero__decoration policies-hero__decoration--one" />
            <div className="policies-hero__decoration policies-hero__decoration--two" />
            {successData && (
                <SuccessModal data={successData} customerName={form.values.name} onClose={() => {setSuccessData(null); navigate(WEBROUTES.HOME);}}/>
            )}
            <header className="checkout_header web_container">
                <div className="flex_start_center gap_15">
                    <Link to={WEBROUTES.HOME} className="btn_icon md border"> <ChevronLeftIcon size={18} /> </Link>
                    <div className="text text_xxl weight_600"> {t("store.checkout.pageTitle")} </div>
                </div>               
            </header>

            <div className="details_checkout_wrapper web_container">

                <div className="checkout_form">
                     <div className="checkout_card_form">
                        <div className="my_end_8">
                            <div className="text text_lg weight_600">  {t("store.checkout.personalInformation")} </div>
                            <div className="text text_sm"> {t("store.checkout.deliveryInformation")} </div>
                        </div>
                        <div className="hr_web"></div>
                        <div className="box_input">
                            <InputText
                                type="text"
                                label={t("store.checkout.fullName")}
                                value={form.values.name}
                                onChange={(e) => form.handleChange("name", e.target.value)}
                                error={form.errors.name}/>
                        </div>
                        <div className="box_input">
                            <InputText
                                type="tel"
                                label={t("store.checkout.phone")}
                                value={form.values.phone}
                                onChange={(e) => form.handleChange("phone", e.target.value)}
                                error={form.errors.phone}/>
                        </div>
                        <div className="box_input">
                            <Textarea
                                label={t("store.checkout.address")}
                                value={form.values.address}
                                onChange={(e) => form.handleChange("address", e.target.value)}
                                error={form.errors.address}
                                rows={3}/>
                        </div>
                        <div className="box_input">
                            <Textarea
                                label={t("store.checkout.note")}
                                value={form.values.note}
                                onChange={(e) => form.handleChange("note",  e.target.value)}
                                error={form.errors.note}
                                rows={3}/>
                        </div>
                        <div className="box_input">
                            <Cities
                                value={city.value}
                                onChange={city.handleChange}
                                error={city.error}
                                multi={false}
                                required={false}
                            />
                        </div>
                    </div>
                </div>

                <div className="checkout_summary_wrapper">
                    <div className="my_end_15">
                        <div className="text text_lg weight_600">{t("store.checkout.orderSummary")} </div>
                        <div className="text text_sm">{t("store.checkout.reviewOrder")}</div>
                    </div>
                    <div className="checkout_summary">
                        <div className="checkout_products">
                            {cart?.products?.map((product: CartProduct) => (
                                <div className="checkout_product" key={product?.id}>
                                    <div className="checkout_product_image">
                                        <img src={product.image || ImagePlaceholder} alt={product.name}/>
                                    </div>
                                    <div className="checkout_product_info">
                                        <span className="text text_sm p_limit_2"> {product.name} </span>
                                        <span className="text text_sm">
                                            {t("store.checkout.quantity")} : <span className="weight_600">{product?.variants?.reduce((total, variant) => total + variant.qty, 0)}</span> 
                                        </span>
                                    </div>
                                    <span className="text text_sm weight_600"> {product.total}{settings?.currency_symbol}</span>
                                </div>
                            ))}
                        </div>
                        <div className="checkout_totals">
                            <div className="checkout_total_row">
                                <div className="text text_sm"> {t("store.checkout.totalItems")} </div>
                                <div className="text text_sm weight_600">{cart?.total}{settings?.currency_symbol}</div>
                            </div>

                            <div className="checkout_total_row saving">
                                <div className="text text_sm"> {t("store.checkout.discount")} </div>
                                <div className="text text_sm weight_600 text_success"> -${cart?.save}{settings?.currency_symbol}</div>
                            </div>

                            <div className="checkout_total_row saving">
                                <div className="text text_sm"> {t("store.checkout.delivery")} </div>
                                <div className="text text_sm weight_600 text_danger"> - 0{settings?.currency_symbol}</div>
                            </div>

                            <div className="checkout_total_row final">
                                <div className="text text_sm"> {t("store.checkout.total")} </div>
                                <div className="text text_md weight_600 text_primary"> {cart?.discount}{settings?.currency_symbol}</div>
                            </div>
                        </div>
                    </div>


                    <div className="row my_15">
                        <button className="col_1 btn primary xl radius_30" type="button" onClick={handleSubmit}>
                            <div className="text text_sm text_white weight_600"> {t("store.checkout.confirmOrder")} </div>
                            {checkoutMutation.isPending && <Loading />}
                        </button>
                    </div>

                    <div className="text text_sm text_center"> {t("store.checkout.termsNotice")} </div>

                </div>

            </div>
        </section>

    )
    /* --------------------------------------------------------------------------------------------- */

}
