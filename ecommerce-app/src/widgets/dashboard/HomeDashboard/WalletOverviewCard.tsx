import { Wallet, ArrowDownLeft, ArrowUpRight, Activity } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useFinancialStatisticsQuery } from "../../../controllers/useStatistics";
import { LoadingDisplay } from "../../../components/ui/LoadingDisplay";
import { NotFound } from "../../../components/ui/NoutFound";
import StatCard from "./StatCard";
import StatTrendBadge from "./StatTrendBadge";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const WalletOverviewCard = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useFinancialStatisticsQuery();

  if (isLoading) return <LoadingDisplay />;
  if (isError || !data) return <NotFound />;

  const { current_month, month_comparison } = data.wallet;

  return (
    <section className="panel_card">
      <header className="panel_card__head">
        <div>
          <div className="text text_lg weight_600">{t("wallet.title")}</div>
          <div className="text text_sm">{t("wallet.subtitle")}</div>
        </div>
      </header>

      <div className="stats_grid stats_grid--inner">
        <StatCard
          icon={<ArrowDownLeft size={22} />}
          iconVariant="green"
          label={t("wallet.credit_month")}
          value={formatCurrency(current_month.total_credit)}
          sub={
            <StatTrendBadge
              trend={month_comparison.credit.trend}
              changePercent={month_comparison.credit.change_percent}
            />
          }
        />

        <StatCard
          icon={<ArrowUpRight size={22} />}
          iconVariant="red"
          label={t("wallet.debit_month")}
          value={formatCurrency(current_month.total_debit)}
          sub={<StatTrendBadge trend={month_comparison.debit.trend} changePercent={month_comparison.debit.change_percent}/>
          }
        />

        <StatCard
          icon={<Activity size={22} />}
          iconVariant="blue"
          label={t("wallet.net_movement_month")}
          value={formatCurrency(current_month.net_movement)}
          sub={
            <StatTrendBadge
              trend={month_comparison.net_movement.trend}
              changePercent={month_comparison.net_movement.change_percent}
            />
          }
        />

        <StatCard
          icon={<Wallet size={22} />}
          iconVariant="orange"
          label={t("wallet.transactions_month")}
          value={current_month.transactions_count}
        />
      </div>
    </section>
  );
};

export default WalletOverviewCard;