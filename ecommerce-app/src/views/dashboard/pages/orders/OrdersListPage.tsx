

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../../../controllers/useOrder";
import { OrdersHeader } from "../../../../widgets/dashboard/orders/OrdersHeader";
import { OrdersSkeleton } from "../../../../widgets/dashboard/orders/LoadingSkeleton";
import { EmptyState } from "../../../../widgets/dashboard/orders/EmptyState";
import { OrdersGrid } from "../../../../widgets/dashboard/orders/OrdersGrid";
import ROUTES from "../../../../routers/dashboard/path";
import { Pagination } from "../../../../components/ui/Pagination";

export default function OrdersListPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [filters] = useState<{search?: string;status?: string;order_type?: string;}>({});
  const params = useMemo(() => ({ page, ...filters }), [page, filters]);
  const { data, isLoading, isFetching } = useOrders(params);

  const totalPages = Math.ceil((data?.pagination?.count || 0) / 10);

  return (
    <div className="orders_module">

        <div className="orders_page">
            <div className="filter_orders"></div>
            <div className="orders_content">
                <OrdersHeader title="Orders" subtitle={`${data?.pagination?.count ?? 0} total orders`}/>

                {/* <OrdersFilters statuses={statuses} value={filters} onChange={(v) => {setFilters(v); setPage(1);}}/> */}

                {isLoading ? (
                    <OrdersSkeleton />
                ) : !data?.results?.length ? (
                    <EmptyState title="No orders found" text="Try adjusting your filters or wait for new orders to come in."/>
                ) : (
                    <OrdersGrid orders={data.results} dimmed={isFetching} onCardClick={(id) => navigate(ROUTES.ORDER_DETAILS(id))}/>
                )}

                {/* {data?.pagination && (
                    <Pagination pagination={data.pagination} onChange={setPage} />
                )} */}
                {totalPages > 1 && (<Pagination page={page} totalPages={totalPages} onPageChange={setPage}/>)}
            </div>
        </div>
    </div>
  );
}