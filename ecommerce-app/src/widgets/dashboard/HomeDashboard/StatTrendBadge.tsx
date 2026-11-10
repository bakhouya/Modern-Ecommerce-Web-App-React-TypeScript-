
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { Trend } from "../../../types/statisticsTypes";

interface Props {
  trend?: Trend | null;
  changePercent?: number | null;
}

const StatTrendBadge = ({ trend, changePercent }: Props) => {
  const { t } = useTranslation();

  const config = {
    up: {
      icon: TrendingUp,
      cls: "stat_trend--up",
    },
    down: {
      icon: TrendingDown,
      cls: "stat_trend--down",
    },
    stable: {
      icon: Minus,
      cls: "stat_trend--stable",
    },
    no_baseline: {
      icon: Minus,
      cls: "stat_trend--neutral",
    },
  };

  const currentTrend = trend ?? "no_baseline";
  const { icon: Icon, cls } = config[currentTrend] ?? config.no_baseline;

  return (
    <span className={`stat_trend ${cls}`}>
      <Icon size={13} />

      {currentTrend === "no_baseline" || changePercent == null ? (
        <span className="text text_xs">
          {t("common.no_baseline")}
        </span>
      ) : (
        <span className="text text_xs">
          {Math.abs(changePercent).toFixed(1)}%
        </span>
      )}
    </span>
  );
};

export default StatTrendBadge;
