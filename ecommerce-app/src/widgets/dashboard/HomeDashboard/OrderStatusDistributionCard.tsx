import { useTranslation } from "react-i18next";

import { useOrderStatisticsQuery } from "../../../controllers/useStatistics";
import { LoadingDisplay } from "../../../components/ui/LoadingDisplay";
import { NotFound } from "../../../components/ui/NoutFound";
import type { OrderStatus } from "../../../types/statisticsTypes";

const STATUS_COLOR_MAP: Record<OrderStatus, string> = {
  PENDING: "#f59e0b",
  CONFIRMED: "#3b82f6",
  PROCESSING: "#8b5cf6",
  READY_TO_SHIP: "#06b6d4",
  SHIPPED: "#0ea5e9",
  DELIVERED: "#22c55e",
  CANCELLED: "#ef4444",
  REFUNDED: "#6b7280",
  PAYMENT_PENDING: "#eab308",
  PAYMENT_FAILED: "#dc2626",
};

const OrderStatusDistributionCard = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useOrderStatisticsQuery();

  if (isLoading) return <LoadingDisplay />;
  if (isError || !data) return <NotFound />;

  const statuses = Object.entries(data.status_distribution.statuses).filter(
    ([, item]) => item.count > 0
  );

  return (
    <article className="panel_card">
      <header className="panel_card__head">
        <div>
          <div className="text text_lg weight_600">{t("order_status.title")}</div>
          <div className="text text_sm">{t("order_status.subtitle")}</div>
        </div>
      </header>

      <div className="status_list">
        {statuses.map(([key, item]) => {
          const status = key as OrderStatus;
          return (
            <div className="status_list__row" key={status}>
              <div className="status_list__label">
                <i className="status_list__dot" style={{ background: STATUS_COLOR_MAP[status] }}/>
                <span className="text text_sm">{t(`status.${status}`)}</span>
              </div>
              <div className="status_list__track">
                <div className="status_list__bar" style={{width: `${item.percentage}%`, background: STATUS_COLOR_MAP[status],}}/>
              </div>
              <div className="status_list__value flex_start_center gap_10">
                <div className="text text_md text_primary">{item.count}</div>
                <div className="slash"></div>
                <span className="text text_md"> {item.percentage.toFixed(1)}%</span>
              </div>
            </div>
          );
        })}
        {statuses.length === 0 && (
          <div className="text text_sm text_center">
            {t("order_status.empty")}
          </div>
        )}
      </div>
    </article>
  );
};

export default OrderStatusDistributionCard;