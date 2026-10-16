import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useHomePageProducts, useProduct, useProductOffers } from "../../controllers/usePublicProducts";
import type { ValueDetail, VariantDetail } from "../../types/productTypes";
import { useAddToCart } from "../../controllers/useCart";
import { LoadingDisplay } from "../../components/ui/LoadingDisplay";
import ProductCard from "../../widgets/web/products/ProductCard";
import { NotFound } from "../../components/ui/NoutFound";
import toast from "react-hot-toast";
import ProductGallery from "../../widgets/web/products/ProductGallery";
import { Minus, Plus, MessageCircle  } from "lucide-react";
import ProductServiceInfo from "../../widgets/web/products/ProductServiceInfo";
import ProductStock from "../../widgets/web/products/ProductStock";
import ProductShare from "../../widgets/web/products/ProductShare";
import ProductOffers from "../../widgets/web/products/ProductOffers";
import { useSettings } from "../../context/settings/PublicSettingsContext";
import ProductComments from "../../widgets/web/products/ProductComments";
import ProductSEO from "../../components/boxs/ProductSEO";

export default function ProductPage() {
    /* --------------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------------- */
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    /* --------------------------------------------------------------------------------------------------- */

    /* --------------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------------- */
    const { data: product, isLoading, isError } = useProduct(id);
    const categoryId = product?.main_category_details?.id;
    const { data: products }            = useHomePageProducts(
        {main_category: categoryId}
    );
    const { data: offer }               = useProductOffers(id);
    const addToCartMutation             = useAddToCart();
    const { settingsQuery }             = useSettings();
    const settings                      = settingsQuery.data ;
    /* --------------------------------------------------------------------------------------------------- */

    /* --------------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------------- */
    // const [selectedImage, setSelectedImage] = useState(0);
    const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<"description" | "details" | "products">("description");
    useEffect(() => {window.scrollTo({top: 0, behavior: "instant"});}, []);
    /* --------------------------------------------------------------------------------------------------- */

    

    /* --------------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------------- */
    const attributes = useMemo(() => {
        if (!product?.variants_details) return {};

        const result: Record<string,{title: string; type: string; values: string[];}> = {};

        product.variants_details.forEach((variant: VariantDetail) => {
        variant.values_details?.forEach((item: ValueDetail) => {
            if (!result[item.attribute_title]) {
            result[item.attribute_title] = {
                title: item.attribute_title,
                type: item.type,
                values: [],
            };
            }

            if (!result[item.attribute_title].values.includes(item.value)) {
            result[item.attribute_title].values.push(item.value);
            }
        });
        });

        return result;
    }, [product]);
    /* --------------------------------------------------------------------------------------------------- */



    /* --------------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------------- */
    const selectedVariant = useMemo(() => {
        if (!product?.variants_details?.length) {return null;}

        // Product has no selectable attributes.
        // Use the default variant from database.
        if (Object.keys(attributes).length === 0) {
            return (product.variants_details.find((variant: VariantDetail) => variant.is_default) ?? null);
        }
        // Product has selectable attributes.
        // User must select all attributes.
        const allAttributesSelected = Object.keys(attributes).every((attribute) => Boolean(selectedValues[attribute]));

        if (!allAttributesSelected) {return null;}

        // Find the exact variant matching selected values.
        return (
            product.variants_details.find((variant: VariantDetail) =>
            variant.values_details.every(
                (item: ValueDetail) =>
                selectedValues[item.attribute_title] === item.value
            )
            ) ?? null
        );
    }, [product, attributes, selectedValues]);
    /* --------------------------------------------------------------------------------------------------- */

    /* --------------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------------- */
    const handleSelect = (attribute: string, value: string) => {
        setSelectedValues((prev) => ({...prev, [attribute]: value, }));
        setQuantity(1);
    };
    /* --------------------------------------------------------------------------------------------------- */

    /* --------------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------------- */
    if (isLoading) {return (<section className="product-page"> <LoadingDisplay /> </section>);}
    if (isError || !product) {return (<NotFound/>);}
    /* --------------------------------------------------------------------------------------------------- */

    /* --------------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------------- */
    const renderProductText = (text: string) => {
        return text.split(/\n\s*\n/).map((paragraph, index) => {
            const lines = paragraph
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);

            const isList = lines.every((line) => line.startsWith("-"));

            if (isList) {
            return (
                <ul key={index} className="product-tabs__list">
                {lines.map((line, lineIndex) => (<li key={lineIndex}> {line.replace(/^-\s*/, "")}</li>))}
                </ul>
            );
            }

            return (
                <p key={index} className="product-tabs__paragraph">
                    {lines.map((line, lineIndex) => (
                    <span key={lineIndex}>
                        {line}
                        {lineIndex < lines.length - 1 && <br />}
                    </span>
                    ))}
                </p>
            );
        });
    };
    /* --------------------------------------------------------------------------------------------------- */

    /* --------------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------------- */
    // const images = product.images_details ?? [];
    const currentPrice = Number( selectedVariant?.price ?? product.price_sale ?? product.price_regular) * quantity;
    const currentStock = selectedVariant?.total_stock  ?? 0;
    const isAddToCartDisabled = !selectedVariant || selectedVariant.total_stock  <= 0;
    /* --------------------------------------------------------------------------------------------------- */


    /* --------------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------------- */
    const handleAddToCart = () => {
        if (!selectedVariant) {return;}
        const payload = {variant: selectedVariant.id, quantity};
        addToCartMutation.mutate(payload, {
            onSuccess: () => {toast.success(t("store.product.addedToCart"));},
        });
    };
    /* --------------------------------------------------------------------------------------------------- */
    const handleWhatsAppOrder = () => {
        if (!selectedVariant || currentStock <= 0) {
            toast.error("Veuillez sélectionner une variante disponible.");
            return;
        }
        const whatsappNumber = settings?.phone ;
        const variantDetails = selectedVariant.values_details?.map((item) => `${item.attribute_title}: ${item.value}`) .join("\n") || "Variante par défaut";
        const message = [
            "Bonjour, je souhaite commander ce produit :",
            "",
            `Produit : ${product.title}`,
            `Référence : ${selectedVariant.id}`,
            `Variante :`,
            variantDetails,
            `Quantité : ${quantity}`,
            `Prix unitaire : ${(currentPrice / quantity).toFixed(2)} ${settings?.currency_symbol ?? ""}`,
            `Total : ${currentPrice.toFixed(2)} ${settings?.currency_symbol ?? ""}`,
            "",
            `Lien du produit : ${window.location.href}`,
            "",
            "Merci de me confirmer la disponibilité et la livraison."
        ].join("\n");
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    };


    /* --------------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------------- */
    return (
        <section className="product-page">
            <ProductSEO product={product} selectedVariant={selectedVariant} currencySymbol={settings?.currency_symbol ?? "MAD"} currentStock={currentStock}/>
            
            <div className="product-page__container web_container">

                <ProductGallery key={product.id} images={product.images_details ?? []} productTitle={product.title}/>

                <div className="product-info">

                    <div className="flex_between_start">
                        <div className="text text_sm my_start_8 product-title-row__title">
                            {product.title}
                        </div>
                        <ProductShare title={product.title} />
                    </div>

                    <div className="product-info__rating text text_sm">
                        <span>★</span>
                        <span>{product.rating || t("store.product.noRating")}</span>
                        <span className="separator">•</span>
                        <span>{product.comments} {t("store.product.reviews")}</span>
                    </div>
                
                    <div className="flex_start_center gap_10 my_start_8">
                        <div className="Ttext text_xl text_primary">
                            {Number(currentPrice).toFixed(2)} {settings?.currency_symbol}
                        </div>
                        {product.price_regular &&
                            Number(product.price_regular) * quantity > Number(currentPrice) && (
                            <div className="text text_sm regular_price">
                                {Number(product.price_regular) * quantity} {settings?.currency_symbol}
                            </div>
                        )}
                        <div className=""></div>
                        {offer?.discount_percentage != null &&
                            Number(offer.discount_percentage) > 0 && (
                            <div className="text text_xs descouver_info text_primary">
                                {Number(offer.discount_percentage)}%{" "}
                                {t("store.product.discount")} —{" "}
                                {t("store.product.limitedTimeOffer")}
                            </div>
                        )}
                    </div>
                
                    <ProductStock currentStock={currentStock} />

                    <div className="product-info__divider" />

                    <div className="product-variants">
                        {Object.entries(attributes).map(
                            ([attribute, config]) => (
                                <div className="product-variant" key={attribute}>
                                    <div className="text text_md flex_between_center">
                                        <span className="my_end_8">{config.title}</span>
                                        {/* <div className="text text_sm"> {selectedValues[attribute] && (<strong>{selectedValues[attribute]}</strong>)} </div>    */}
                                        <div className="text text_sm"> 
                                            {selectedValues[attribute] 
                                                ? (<div className="text text_sm">{selectedValues[attribute]}</div>) 
                                                : (<div className="text text_xs"> --- </div>)}  
                                        </div>   
                                    </div>

                                    <div className={config.type === "color" ? "product-variant__options varaint_colors" : "product-variant__options"}>
                                        {config.values.map((value) => {
                                            const isSelected = selectedValues[attribute] === value;
                                            return (
                                                <button key={value} type="button" className={isSelected ? "variant-option selected" : "variant-option"}
                                                    onClick={() =>handleSelect(attribute, value)}>
                                                    {config.type === "color" && (
                                                        <span className="variant-option__color" style={{backgroundColor: value.toLowerCase()}} />
                                                    )}
                                                    {config.type != "color" && (<div className="text text_sm weight_600"> {value} </div>)}
                                                    
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <div className="product-quantity">
                        <div className="text text_md">{t("store.product.quantity")} </div>

                        <div className="product-quantity__control">
                            <button type="button" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} disabled={quantity <= 1} aria-label={t("store.product.decreaseQuantity")}>
                                <Minus size={16} strokeWidth={2} />
                            </button>

                            <span>{quantity}</span>

                            <button type="button"
                                onClick={() => setQuantity((prev) => Math.min(currentStock, prev + 1))} disabled={quantity >= currentStock} aria-label={t("store.product.increaseQuantity")}>
                                <Plus size={16} strokeWidth={2} />
                            </button>
                        </div>
                    </div>

                    <div className="product-info__divider" />

                    <button
                        type="button"
                        className="btn primary lg radius_30"
                        disabled={isAddToCartDisabled || addToCartMutation.isPending}
                        onClick={handleAddToCart}>
                        {addToCartMutation.isPending && (<div className="btn_loader"></div>)}
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24">
                            <path fill="currentColor" fill-rule="evenodd" d="M8.418 3.25c.28-.59.884-1 1.582-1h4c.698 0 1.301.41 1.582 1c.683.006 1.216.037 1.692.223a3.25 3.25 0 0 1 1.426 1.09c.367.494.54 1.127.776 1.998l.742 2.722l.28.841l.024.03c.901 1.154.472 2.87-.386 6.301c-.546 2.183-.818 3.274-1.632 3.91c-.814.635-1.939.635-4.189.635h-4.63c-2.25 0-3.375 0-4.189-.635c-.814-.636-1.087-1.727-1.632-3.91c-.858-3.431-1.287-5.147-.386-6.301l.024-.03l.28-.841l.742-2.722c.237-.871.41-1.505.776-1.999a3.25 3.25 0 0 1 1.426-1.089c.476-.186 1.008-.217 1.692-.222m.002 1.502c-.662.007-.928.032-1.148.118a1.75 1.75 0 0 0-.768.587c-.176.237-.28.568-.57 1.635l-.57 2.089C6.384 9 7.778 9 9.684 9h4.631c1.907 0 3.3 0 4.32.18l-.569-2.089c-.29-1.067-.394-1.398-.57-1.635a1.75 1.75 0 0 0-.768-.587c-.22-.086-.486-.111-1.148-.118A1.75 1.75 0 0 1 14 5.75h-4a1.75 1.75 0 0 1-1.58-.998" clip-rule="evenodd"/>
                        </svg>
                        <div className="text text_sm text_white  weight_600">
                            {addToCartMutation.isPending ? t("store.product.addingToCart") : t("store.product.addToCart") }
                        </div>
                    </button>

                    <button
                        type="button"
                        className="btn secondary lg radius_30 my_start_12"
                        disabled={!selectedVariant || currentStock <= 0}
                        onClick={handleWhatsAppOrder}>
                        <MessageCircle size={20} strokeWidth={2.2} />
                        <span className="text text_sm">Commander via WhatsApp</span>
                    </button>



                    <ProductServiceInfo />

                    <ProductOffers offer={offer} quantity={quantity}/>


                </div>

            </div>


            <div className="web_container product_page_bottom">
                <section className="product-tabs">

                    <div className="product-tabs__nav">
                        <button
                            type="button"
                            className={
                            activeTab === "description" ? "product-tabs__tab active" : "product-tabs__tab"}
                            onClick={() => setActiveTab("description")}>
                            <div className="text text_md"> {t("store.productComments.heading")} </div>
                        </button>

                        <button
                            type="button"
                            className={
                            activeTab === "details" ? "product-tabs__tab active" : "product-tabs__tab"
                            }onClick={() => setActiveTab("details")}>

                            <div className="text text_md p_limit_1"> {t("store.product.tabs.details")} </div>
                        </button>

                        <button
                            type="button"
                            className={
                            activeTab === "products" ? "product-tabs__tab active" : "product-tabs__tab"
                            }onClick={() => setActiveTab("products")}>
                            <div className="text text_md">  {t("store.product.tabs.products")} </div>
                        </button>
                    </div>
                        
                    <div className="product-tabs__content">
                        {activeTab === "description" && (
                            <div className="product-tabs__panel">
                                <ProductComments productId={String(product.id)} />
                            </div>
                        )}

                        {activeTab === "details" && (
                            <div className="product-tabs__panel text text_sm">
                                {renderProductText(product.details)}
                            </div>
                        )}
                        {activeTab === "products" && (
                            <div className="product-tabs__panel">
                                <div className="products_list">
                                    {products?.map((product) => (
                                        <div key={product.id}>
                                            <ProductCard product={product} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </section>

            </div>

        </section>
    );
    /* --------------------------------------------------------------------------------------------------- */


}
