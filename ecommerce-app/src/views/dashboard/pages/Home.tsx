

import { useTranslation } from "react-i18next";
import { LayoutDashboard } from "lucide-react";
import StoreOverviewCards from "../../../widgets/dashboard/HomeDashboard/StoreOverviewCards";
import OrdersOverviewCard from "../../../widgets/dashboard/HomeDashboard/OrdersOverviewCard";
import OrdersGroupsCard from "../../../widgets/dashboard/HomeDashboard/OrdersGroupsCard";
import OrderStatusDistributionCard from "../../../widgets/dashboard/HomeDashboard/OrderStatusDistributionCard";
import CustomerVisitorOverviewCard from "../../../widgets/dashboard/HomeDashboard/CustomerVisitorOverviewCard";
import WalletOverviewCard from "../../../widgets/dashboard/HomeDashboard/WalletOverviewCard";
import ExpensesOverviewCard from "../../../widgets/dashboard/HomeDashboard/ExpensesOverviewCard";
import CombinedCurrentMonthCard from "../../../widgets/dashboard/HomeDashboard/CombinedCurrentMonthCard";
import { useStoreStatisticsQuery } from "../../../controllers/useStatistics";
import { LoadingDisplay } from "../../../components/ui/LoadingDisplay";
import { NotFound } from "../../../components/ui/NoutFound";

const HomeDashboard = () => {
    const { t } = useTranslation();
    const { data: StoreOverview, isLoading: StoreOverviewLoading, isError: StoreOverviewError } = useStoreStatisticsQuery();

    
  if (StoreOverviewLoading) return <LoadingDisplay />;
  if (StoreOverviewError || !StoreOverview) return <NotFound />;
    
    return (
      <main className="home_dashboard">
        <header className="home_dashboard__head">
          <div className="home_dashboard__heading">
            <div className="avatars__lg">
              <LayoutDashboard size={22} />
            </div>
            <div>
              <div className="text text_lg weight_600">
                {t("home.title")}
              </div>
              <div className="text text_sm">{t("home.subtitle")}</div>
            </div>
          </div>
        </header>

        <StoreOverviewCards data={StoreOverview} />

        <section className="home_dashboard__grid_2">
          <OrdersOverviewCard />
          <OrdersGroupsCard />
        </section>

        <OrderStatusDistributionCard />

        <CustomerVisitorOverviewCard />

        <WalletOverviewCard />
        <ExpensesOverviewCard />
        <CombinedCurrentMonthCard />
      </main>
    );
};

export default HomeDashboard;



