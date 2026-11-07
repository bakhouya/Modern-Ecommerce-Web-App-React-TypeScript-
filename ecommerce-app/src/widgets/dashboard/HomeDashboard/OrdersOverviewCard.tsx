import { ShoppingCart, CalendarDays, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useOrderStatisticsQuery } from "../../../controllers/useStatistics";
import { LoadingDisplay } from "../../../components/ui/LoadingDisplay";
import { NotFound } from "../../../components/ui/NoutFound";

const OrdersOverviewCard = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useOrderStatisticsQuery();

  if (isLoading) return <LoadingDisplay />;
  if (isError || !data) return <NotFound />;

  return (
    <article className="panel_card">
      <header className="panel_card__head">
        <div>
          <div className="text text_lg weight_600">
            {t("orders_overview.title")}
          </div>
          <div className="text text_sm">{t("orders_overview.subtitle")}</div>
        </div>
      </header>

      <div className="orders_overview">
        <div className="orders_overview__item">
          <div className="orders_overview__icon orders_overview__icon--blue">
            <ShoppingCart size={20} />
          </div>
          <div>
            <span className="text text_sm">{t("orders_overview.total")}</span>
            <strong className="text text_xl">{data.orders.total}</strong>
          </div>
        </div>

        <div className="orders_overview__item">
          <div className="orders_overview__icon orders_overview__icon--green">
            <CalendarDays size={20} />
          </div>
          <div>
            <span className="text text_sm">
              {t("orders_overview.today")}
            </span>
            <strong className="text text_xl">
              {data.orders.created_today}
            </strong>
          </div>
        </div>

        <div className="orders_overview__item">
          <div className="orders_overview__icon orders_overview__icon--orange">
            <TrendingUp size={20} />
          </div>
          <div>
            <span className="text text_sm">
              {t("orders_overview.avg_daily")}
            </span>
            <strong className="text text_xl">
              {data.orders.average_daily_last_30_days.toFixed(2)}
            </strong>
          </div>
        </div>
      </div>

      <footer className="orders_overview__footer">
        <span className="text text_xs">
          {t("orders_overview.cancellation_rate")}
        </span>
        <strong className="text text_sm text_danger">
          {data.cancellation_rate.toFixed(2)}%
        </strong>
      </footer>
    </article>
  );
};

export default OrdersOverviewCard;