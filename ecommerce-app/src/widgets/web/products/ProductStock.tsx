



import { CheckCircle2, CircleX, Package } from "lucide-react";
import { useTranslation } from "react-i18next";
interface ProductStockProps {currentStock: number;}

export default function ProductStock({currentStock}: ProductStockProps) {
    const { t } = useTranslation();
    const isAvailable = currentStock > 0;
    const isLowStock = currentStock <= 5;

    return (
        <div className="product-stock">
            {isAvailable ? (
                <div className="product-stock__status product-stock__status--available">
                    <div className="product-stock__icon">
                        <CheckCircle2 size={19} />
                    </div>

                    <div className="product-stock__content">
                        <span className="product-stock__title"> {t("store.productStock.available")} </span>
                        <span className="product-stock__description">
                            {isLowStock ? t("store.productStock.lowStock", {count: currentStock}) : t("store.productStock.availableToOrder")}
                        </span>
                    </div>
                    <Package className="product-stock__package" size={21}/>
                </div>
            ) : (
                <div className="product-stock__status product-stock__status--unavailable" role="status">
                    <div className="product-stock__icon"><CircleX size={20} /></div>

                    <div className="product-stock__content">
                        <span className="product-stock__title">{t("store.productStock.unavailable")}</span>
                        <span className="product-stock__description"> {t("store.productStock.unavailableDescription")} </span>
                    </div>
                </div>
            )}
        </div>
    );
}

