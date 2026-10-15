
import { useTranslation } from "react-i18next";
import {
    BadgePercent,
    CheckCircle2,
    Gift,
    ShoppingBag,
    Sparkles,
    TrendingUp,
} from "lucide-react";
import type { ProductOffer } from "../../../types/offersTypes";

type ProductOffersProps = {
    offer: ProductOffer | null | undefined;
    quantity: number;
};

function formatAmount(amount: number) {
    return new Intl.NumberFormat("fr-MA", {
        maximumFractionDigits: 2,
    }).format(amount);
}

export default function ProductOffers({
    offer,
    quantity,
}: ProductOffersProps) {
    const { t } = useTranslation();

    if (!offer) return null;

    const isQuantityOffer = offer.condition_type === "QUANTITY";

    const variants = [...(offer.variants ?? [])].sort(
        (a, b) => a.min_order_pieces - b.min_order_pieces
    );

    const eligibleVariants = variants.filter(
        (variant) => quantity >= variant.min_order_pieces
    );

    const bestEligibleVariant =
        eligibleVariants[eligibleVariants.length - 1];

    const nextVariant = variants.find(
        (variant) => quantity < variant.min_order_pieces
    );

    const progress = nextVariant
        ? Math.min(
              100,
              (quantity / nextVariant.min_order_pieces) * 100
          )
        : 100;

    const hasDiscount =
        offer.discount_percentage != null ||
        offer.discount_fixed_amount != null;

    if (isQuantityOffer && variants.length === 0) {
        return null;
    }

    if (
        !isQuantityOffer &&
        !hasDiscount &&
        offer.min_order_price == null
    ) {
        return null;
    }

    return (
        <section
            className="product-offers"
            aria-label={t("store.productOffers.ariaLabel")}
        >
            <div className="product-offers__header">
                <div className="product-offers__heading-icon">
                    <Gift size={21} />
                </div>

                <div className="product-offers__heading-content">
                    <div className="text text_sm weight_600">
                        {t("store.productOffers.title")}
                    </div>

                    <div className="text text_sm">
                        {t("store.productOffers.subtitle")}
                    </div>
                </div>

                <span className="product-offers__header-badge">
                    <Sparkles size={13} />
                    <span className="text text_xs text_primary">
                        {t("store.productOffers.promo")}
                    </span>
                </span>
            </div>

            {isQuantityOffer ? (
                <>
                    {bestEligibleVariant && (
                        <div className="product-offers__success">
                            <CheckCircle2 size={19} />

                            <div>
                                <div className="text text_sm weight_600">
                                    {t(
                                        "store.productOffers.congratulations"
                                    )}
                                </div>

                                <div className="text text_sm">
                                    {t(
                                        "store.productOffers.bestDiscountMessage"
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="product-offers__tiers">
                        {variants.map((variant) => {
                            const isReached =
                                quantity >= variant.min_order_pieces;

                            const isBest =
                                bestEligibleVariant === variant;

                            const piecesNeeded = Math.max(
                                0,
                                variant.min_order_pieces - quantity
                            );

                            return (
                                <article
                                    key={variant.min_order_pieces}
                                    className={[
                                        "product-offers__tier",
                                        isReached
                                            ? "product-offers__tier--reached"
                                            : "",
                                        isBest
                                            ? "product-offers__tier--best"
                                            : "",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                >
                                    <div className="product-offers__tier-top">
                                        <div className="product-offers__tier-icon">
                                            {isReached ? (
                                                <CheckCircle2 size={19} />
                                            ) : (
                                                <ShoppingBag size={19} />
                                            )}
                                        </div>

                                        <div className="product-offers__tier-info">
                                            <span className="product-offers__tier-label">
                                                {t(
                                                    isReached
                                                        ? "store.productOffers.unlockedTier"
                                                        : "store.productOffers.quantityOffer"
                                                )}
                                            </span>

                                            <strong className="product-offers__tier-quantity">
                                                {t(
                                                    "store.productOffers.from"
                                                )}{" "}
                                                {variant.min_order_pieces}{" "}
                                                {t(
                                                    variant.min_order_pieces > 1
                                                        ? "store.productOffers.pieces"
                                                        : "store.productOffers.piece"
                                                )}
                                            </strong>
                                        </div>

                                        <div className="product-offers__discount">
                                            {variant.discount_percentage != null && (
                                                <strong>
                                                    -{variant.discount_percentage}%
                                                </strong>
                                            )}

                                            {variant.discount_fixed_amount != null && (
                                                <strong>
                                                    -{formatAmount(
                                                        Number(
                                                            variant.discount_fixed_amount
                                                        )
                                                    )}{" "}
                                                    MAD
                                                </strong>
                                            )}
                                        </div>
                                    </div>

                                    <div className="product-offers__tier-bottom">
                                        {isReached ? (
                                            <span className="product-offers__tier-status">
                                                <CheckCircle2 size={15} />
                                                {t(
                                                    "store.productOffers.discountActivated"
                                                )}
                                            </span>
                                        ) : (
                                            <span className="product-offers__tier-status product-offers__tier-status--pending">
                                                {t(
                                                    "store.productOffers.piecesRemaining",
                                                    {
                                                        count: piecesNeeded,
                                                    }
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {nextVariant && (
                        <div className="product-offers__progress">
                            <div className="product-offers__progress-heading">
                                <span>
                                    <TrendingUp size={16} />
                                    {t("store.productOffers.nextTier")}
                                </span>

                                <strong>
                                    {Math.round(progress)}%
                                </strong>
                            </div>

                            <div
                                className="product-offers__progress-track"
                                role="progressbar"
                                aria-label={t(
                                    "store.productOffers.progressLabel"
                                )}
                                aria-valuenow={Math.round(progress)}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                <div
                                    className="product-offers__progress-fill"
                                    style={{
                                        width: `${progress}%`,
                                    }}
                                />
                            </div>

                            <p>
                                {t(
                                    "store.productOffers.addToUnlock"
                                )}{" "}
                                <strong>
                                    {nextVariant.min_order_pieces - quantity}{" "}
                                    {t(
                                        nextVariant.min_order_pieces - quantity > 1
                                            ? "store.productOffers.pieces"
                                            : "store.productOffers.piece"
                                    )}
                                </strong>{" "}
                                {t(
                                    "store.productOffers.toUnlockNext"
                                )}
                            </p>
                        </div>
                    )}

                    {!nextVariant && bestEligibleVariant && (
                        <div className="product-offers__max-reached">
                            <Sparkles size={16} />
                            {t("store.productOffers.lastTierReached")}
                        </div>
                    )}
                </>
            ) : (
                <div className="product-offers__single">
                    <div className="product-offers__single-icon">
                        <BadgePercent size={25} />
                    </div>

                    <div className="product-offers__single-content">
                        <span className="product-offers__single-label">
                            {t(
                                "store.productOffers.promotionalOffer"
                            )}
                        </span>

                        <div className="product-offers__single-discounts">
                            {offer.discount_percentage != null && (
                                <strong>
                                    -{offer.discount_percentage}%
                                </strong>
                            )}

                            {offer.discount_fixed_amount != null && (
                                <strong>
                                    -{formatAmount(
                                        Number(
                                            offer.discount_fixed_amount
                                        )
                                    )}{" "}
                                    MAD
                                </strong>
                            )}
                        </div>

                        {offer.min_order_price != null && (
                            <p>
                                {t(
                                    "store.productOffers.validFrom"
                                )}{" "}
                                <strong>
                                    {formatAmount(
                                        Number(offer.min_order_price)
                                    )}{" "}
                                    MAD
                                </strong>{" "}
                                {t("store.productOffers.purchase")}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}