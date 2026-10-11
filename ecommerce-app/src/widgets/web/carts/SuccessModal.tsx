
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import type { CheckoutResponse } from "../../../types/cartTypes";
import { useInvoicePdf } from "../../../controllers/useCart";


interface Props {data: CheckoutResponse; customerName?: string; onClose: () => void;}



export default function SuccessModal({ data, customerName, onClose }: Props) {
    const { t, i18n } = useTranslation();
    const { refetch: fetchInvoicePdf, isFetching: isInvoiceLoading, } = useInvoicePdf(data.invoice || "");

    useEffect(() => {
        console.log(data.invoice);
        document.body.style.overflow = "hidden";
        return () => {document.body.style.overflow = "";};
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const date = new Date(data.created_at).toLocaleString(
        i18n.language === "ar" ? "ar-MA" : "fr-FR",
        {
            dateStyle: "medium",
            timeStyle: "short",
        }
    );

    const handleInvoice = async () => {
        try {
            const { data: pdfBlob } = await fetchInvoicePdf();
            if (!pdfBlob) return;
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, "_blank");
        } catch (error) {return}
    };


    return (
        <div className="success_overlay" onClick={onClose}>

            <div className="success_modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
                <button className="success_close" type="button" onClick={onClose} aria-label={t("store.checkout.success.close")}>
                    <X size={18} />
                </button>

                <div className="success_icon">
                    <CheckCircle2 size={56} strokeWidth={1.8} />
                </div>

                <h2 className="success_title"> {t("store.checkout.success.title")} {customerName ? `, ${customerName}` : ""} ! 🎉</h2>
                <p className="success_message"> {t("store.checkout.success.message")}</p>

                <div className="success_details">
                    <div className="success_row">
                        <span>{t("store.checkout.success.orderCode")}</span>
                        <div className="code">{data.order_code}</div>
                    </div>
                    <div className="success_row">
                        <span>{t("store.checkout.success.date")}</span>
                        <div>{date}</div>
                    </div>
                    <div className="success_row">
                        <span>{t("store.checkout.success.status")}</span>
                        <div className="text text_sm text_success">{data.status}</div>
                    </div>
                    <div className="success_row total">
                        <span>{t("store.checkout.success.total")}</span>
                        <div>{data.total_price} Dh</div>
                    </div>
                </div>

                <button
                    className="btn primary lg success_btn"
                    type="button"
                    onClick={handleInvoice}
                    disabled={isInvoiceLoading}>

                    {isInvoiceLoading && (<span className="btn_loader"></span>)}

                    <div className="text text_sm">
                        {isInvoiceLoading ? t("store.checkout.success.loadingInvoice") : t("store.checkout.success.downloadInvoice")}
                    </div>
                </button>
            </div>
            
        </div>
    );


}