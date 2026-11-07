import { Users, UserCheck, UserPlus, Repeat, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useCustomerVisitorStatisticsQuery } from "../../../controllers/useStatistics";
import { LoadingDisplay } from "../../../components/ui/LoadingDisplay";
import { NotFound } from "../../../components/ui/NoutFound";
import StatCard from "./StatCard";

const CustomerVisitorOverviewCard = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useCustomerVisitorStatisticsQuery();

  if (isLoading) return <LoadingDisplay />;
  if (isError || !data) return <NotFound />;

  const currency = data.revenue.currency;
  const totalRevenue =
    parseFloat(data.revenue.new_customers) +
    parseFloat(data.revenue.returning_customers);

  return (
    <section className="stats_grid">
      <StatCard
        icon={<Users size={26} />}
        iconVariant="blue"
        label={t("customers.visitors_total")}
        value={data.visitors.total}
        footer={
          <span className="text text_xs">
            {t("customers.conversion_rate", {
              value: data.visitors.conversion_rate_percent.toFixed(2),
            })}
          </span>
        }
      />

      <StatCard
        icon={<UserCheck size={26} />}
        iconVariant="green"
        label={t("customers.purchasing")}
        value={data.customers.purchasing_customers}
        footer={
          <span className="text text_xs">
            {t("customers.avg_orders", {
              value: data.customers.average_orders_per_customer.toFixed(2),
            })}
          </span>
        }
      />

      <StatCard
        icon={<UserPlus size={26} />}
        iconVariant="purple"
        label={t("customers.new")}
        value={data.customers.new_customers}
      />

      <StatCard
        icon={<Repeat size={26} />}
        iconVariant="orange"
        label={t("customers.returning")}
        value={data.customers.returning_customers}
      />

      <StatCard
        icon={<Wallet size={26} />}
        iconVariant="green"
        label={t("customers.revenue_total")}
        value={`${totalRevenue.toFixed(2)} ${currency}`}
      />
    </section>
  );
};

export default CustomerVisitorOverviewCard;