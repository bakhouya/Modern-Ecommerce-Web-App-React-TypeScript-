import { type FormEvent, useState } from "react";
import { Check, Package, Search, Truck} from "lucide-react";
import { useOrderTrackStatuses, useTrackOrder } from "../../controllers/useCart";
import { useTranslation } from "react-i18next";



const TrackOrder = () => {
    const { t } = useTranslation();
    const [orderCode, setOrderCode] = useState("");
    const [submittedCode, setSubmittedCode] = useState("");
    
    const { data: order, isLoading: isOrderLoading, isError: isOrderError} = useTrackOrder(submittedCode);
    const {data: statuses = [], isLoading: isStatusesLoading} = useOrderTrackStatuses();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const code = orderCode.trim();
        if (!code) {return;}
        setSubmittedCode(code);
    };
    const currentStatusIndex = order ? statuses.findIndex((status) => status.id === order.id) : -1;

    const getStatusState = (index: number) => {
        if (currentStatusIndex === -1) { return "";}
        if (index < currentStatusIndex) {return "completed";}
        if (index === currentStatusIndex) {return "active";}
        return "pending";
    };

    return (
        <main className="track-order">

            <div className="track-order__container">
                <div className="track-order__header">
                    <div className="track-order__icon"><Package size={25} /></div>
                    <h2 className="text text_xl weight_700"> {t("store.trackOrder.title")} </h2>
                    <p className="text text_sm"> {t("store.trackOrder.subtitle")} </p>               
                </div>

                <form className="track-order__search" onSubmit={handleSubmit}>
                    <div className="track-order__input-wrapper text text_sm">
                        <Search size={22} />
                        <input type="text" value={orderCode} onChange={(e) => setOrderCode(e.target.value)} placeholder={t("store.trackOrder.inputPlaceholder")} autoComplete="off"/>
                    </div>

                    <button type="submit" disabled={!orderCode.trim() || isOrderLoading}>
                        {isOrderLoading && <div className="btn_load"></div>}
                        <span className="text text_sm text_white"> {isOrderLoading ? t("store.trackOrder.searching") : t("store.trackOrder.trackButton")} </span>
                    </button>

                </form>


                {/* Error */}
                {isOrderError && (
                    <div className="track-order__error">
                        <div className="track-order__error-icon">!</div>
                        <div>
                            <div className="text text_mg text_danger"> {t("store.trackOrder.notFoundTitle")} </div>
                            <div className="text text_xs">
                                {/* {(orderError as any)?.response?.data?.error || t("store.trackOrder.notFoundMessage")} */}
                                {t("store.trackOrder.notFoundMessage")}
                            </div>
                        </div>
                    </div>
                )}


                {/* Result */}
                {order && !isStatusesLoading && (
                    <section className="track-order__result">
                        <div className="track-order__order-info">

                            <div>
                                <div className="text text_xs">{t("store.trackOrder.orderNumber")}</div>
                                <div className="text text_md weight_500 text_primary">#{order.order_code}</div>
                            </div>

                            <div className="track-order__current-status" style={{color: order.status_color,}}>
                                <div className="text text_xs"> {t("store.trackOrder.currentStatus")} </div>
                                <div className="text text_sm text_success"> {order.status} </div>
                            </div>

                        </div>


                        {/* Timeline */}
                        <div className="track-order__timeline">
                            {statuses.map((status, index) => {
                                const state = getStatusState(index);

                                return (
                                    <div key={status.id} className={`track-order__step ${state}`}>

                                        <div className="track-order__step-indicator">
                                            {state === "completed" ? (<Check size={17} />) : (<span>{index + 1}</span>)}
                                        </div>
                                        <div className="track-order__step-content">
                                            <div className="text text_sm">{status.title}</div>
                                            {state === "active" && (<div className="text text_xs">{order.message}</div>)}
                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    </section>
                )}


                {!submittedCode && (
                    <div className="track-order__empty">
                        <Truck size={42} />
                        <h2 className="text text_xl">{t("store.trackOrder.emptyTitle")}</h2>
                        <p className="text text_sm">{t("store.trackOrder.emptyDescription")}</p>
                    </div>
                )}

            </div>

        </main>
    );
};

export default TrackOrder;