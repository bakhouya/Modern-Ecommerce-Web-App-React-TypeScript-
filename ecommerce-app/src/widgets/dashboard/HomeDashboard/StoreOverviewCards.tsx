import { ShoppingBag, Eye, UserPlus, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

// import { useStoreStatisticsQuery } from "../../../controllers/useStatistics";
// import { LoadingDisplay } from "../../../components/ui/LoadingDisplay";
// import { NotFound } from "../../../components/ui/NoutFound";
import StatCard from "./StatCard";
import StatTrendBadge from "./StatTrendBadge";
import type { StoreStatisticsResponse } from "../../../types/statisticsTypes";

interface Props {data: StoreStatisticsResponse | null | undefined;}

const StoreOverviewCards = ({data}: Props) => {
  const { t } = useTranslation();
  // const { data, isLoading, isError } = useStoreStatisticsQuery();

  if (!data) return null;

  return (
    <section className="stats_grid">
      <StatCard
        icon={<ShoppingBag size={26} />}
        iconVariant="blue"
        label={t("store.orders_today")}
        value={data.orders.created.today}
        sub={<StatTrendBadge trend={data.orders.created.trend} changePercent={data.orders.created.change_percent}/>}
        footer={
          <span className="text text_xs">
            {t("store.vs_yesterday", {
              value: data.orders.created.yesterday,
            })}
          </span>
        }
      />

      <StatCard
        icon={<Clock size={26} />}
        iconVariant="orange"
        label={t("store.pending_orders")}
        value={data.orders.pending_total}
        footer={
          <span className="text text_xs">
            {t("store.pending_created_today", {
              value: data.orders.pending_created.today,
            })}
          </span>
        }
      />

      <StatCard
        icon={<Eye size={26} />}
        iconVariant="green"
        label={t("store.visits_today")}
        value={data.visits.today}
        sub={
          <StatTrendBadge
            trend={data.visits.trend}
            changePercent={data.visits.change_percent}
          />
        }
        footer={
          <span className="text text_xs">
            {t("store.vs_yesterday", { value: data.visits.yesterday })}
          </span>
        }
      />

      <StatCard
        icon={<UserPlus size={26} />}
        iconVariant="purple"
        label={t("store.new_visitors")}
        value={data.new_visitors.today}
        sub={
          <StatTrendBadge
            trend={data.new_visitors.trend}
            changePercent={data.new_visitors.change_percent}
          />
        }
        footer={
          <span className="text text_xs">
            {t("store.vs_yesterday", { value: data.new_visitors.yesterday })}
          </span>
        }
      />
    </section>
  );
};

export default StoreOverviewCards;