import { useTranslation } from "react-i18next";

import { useOrderStatisticsQuery } from "../../../controllers/useStatistics";
import { LoadingDisplay } from "../../../components/ui/LoadingDisplay";
import { NotFound } from "../../../components/ui/NoutFound";

const OrdersGroupsCard = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useOrderStatisticsQuery();

  if (isLoading) return <LoadingDisplay />;
  if (isError || !data) return <NotFound />;

  const groups = [
    { key: "pending_confirmation", variant: "orange" },
    { key: "confirmed_and_processing", variant: "blue" },
    { key: "shipped_and_delivered", variant: "green" },
    { key: "cancelled", variant: "red" },
  ] as const;

  return (
    <article className="panel_card">
      <header className="panel_card__head">
        <div>
          <div className="text text_lg weight_600">
            {t("order_groups.title")}
          </div>
          <div className="text text_sm">{t("order_groups.subtitle")}</div>
        </div>
      </header>

      <div className="groups_grid">
        {groups.map(({ key, variant }) => {
          const item = data.groups[key];
          return (
            <div
              className={`groups_tile groups_tile--${variant}`}
              key={key}
            >
              <span className="text text_xs">{t(`groups.${key}`)}</span>
              <strong className="text text_xl">{item.count}</strong>
              <span className="text text_xs">
                {item.percentage.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default OrdersGroupsCard;