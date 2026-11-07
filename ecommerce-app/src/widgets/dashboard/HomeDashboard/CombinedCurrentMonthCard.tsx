import { Wallet, Receipt, ArrowRightLeft, TrendingDown } from "lucide-react";
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

const CombinedCurrentMonthCard = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useFinancialStatisticsQuery();

  if (isLoading) return <LoadingDisplay />;
  if (isError || !data) return <NotFound />;

  const combined = data.combined_current_month;

  return (
    <section className="panel_card">
      <header className="panel_card__head">
        <div>
          <div className="text text_lg weight_600">
            {t("combined.title")}
          </div>
          <div className="text text_sm">{t("combined.subtitle")}</div>
        </div>
      </header>

      <div className="stats_grid stats_grid--inner">
        <StatCard
          icon={<Wallet size={22} />}
          iconVariant="green"
          label={t("combined.wallet_credit")}
          value={formatCurrency(combined.wallet_credit)}
        />

        <StatCard
          icon={<Wallet size={22} />}
          iconVariant="red"
          label={t("combined.wallet_debit")}
          value={formatCurrency(combined.wallet_debit)}
        />

        <StatCard
          icon={<Receipt size={22} />}
          iconVariant="orange"
          label={t("combined.operating_expenses")}
          value={formatCurrency(combined.operating_expenses)}
        />

        <StatCard
          icon={<ArrowRightLeft size={22} />}
          iconVariant="blue"
          label={t("combined.outflows_plus_expenses")}
          value={formatCurrency(combined.recorded_outflows_plus_expenses)}
          sub={
            <StatTrendBadge
              trend={combined.outflows_plus_expenses_comparison.trend}
              changePercent={
                combined.outflows_plus_expenses_comparison.change_percent
              }
            />
          }
        />

        <StatCard
          icon={<TrendingDown size={22} />}
          iconVariant="purple"
          label={t("combined.previous_month")}
          value={formatCurrency(combined.previous_month_outflows_plus_expenses)}
        />
      </div>
    </section>
  );
};

export default CombinedCurrentMonthCard;