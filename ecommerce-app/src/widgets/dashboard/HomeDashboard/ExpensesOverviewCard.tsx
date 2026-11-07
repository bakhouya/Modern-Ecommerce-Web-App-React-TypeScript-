import { Receipt, Calendar } from "lucide-react";
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

const ExpensesOverviewCard = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useFinancialStatisticsQuery();

  if (isLoading) return <LoadingDisplay />;
  if (isError || !data) return <NotFound />;

  const { current_month, last_30_days, month_comparison, by_category } =
    data.expenses;

  const topCategories = [...by_category].sort((a, b) => b.total - a.total).slice(0, 5);

  return (
    <section className="panel_card">
      <header className="panel_card__head">
        <div>
          <div className="text text_lg weight_600">
            {t("expenses.title")}
          </div>
          <div className="text text_sm">{t("expenses.subtitle")}</div>
        </div>
      </header>

      <div className="stats_grid stats_grid--inner">
        <StatCard
          icon={<Calendar size={22} />}
          iconVariant="orange"
          label={t("expenses.current_month")}
          value={formatCurrency(current_month.total)}
          sub={
            <StatTrendBadge
              trend={month_comparison.trend}
              changePercent={month_comparison.change_percent}
            />
          }
          footer={
            <span className="text text_xs">
              {t("expenses.transactions", { count: current_month.count })}
            </span>
          }
        />

        <StatCard
          icon={<Receipt size={22} />}
          iconVariant="blue"
          label={t("expenses.last_30_days")}
          value={formatCurrency(last_30_days.total)}
          footer={
            <span className="text text_xs">
              {t("expenses.transactions", { count: last_30_days.count })}
            </span>
          }
        />
      </div>

      {topCategories.length > 0 && (
        <div className="expenses_categories">
          <div className="text text_sm weight_600">
            {t("expenses.top_categories")}
          </div>
          <div className="expenses_categories__list">
            {topCategories.map((category) => (
              <div
                className="expenses_categories__row"
                key={category.category_id}
              >
                <span className="text text_sm">
                  {category.category_name}
                </span>
                <span className="text text_sm weight_600">
                  {formatCurrency(category.total)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ExpensesOverviewCard;