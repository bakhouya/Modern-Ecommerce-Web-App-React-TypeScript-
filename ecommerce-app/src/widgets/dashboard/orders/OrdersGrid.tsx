import type { Order } from "../../../types/ordersTyes";
import { OrderCard } from "./OrderCard";




export function OrdersGrid({
  orders,
  onCardClick,
  dimmed,
}: {
  orders: Order[];
  onCardClick: (id: string) => void;
  dimmed?: boolean;
}) {
  return (
    <div className={`orders_grid ${dimmed ? "orders_grid_dimmed" : ""}`}>
      {orders.map((o) => (
        <OrderCard key={o.id} order={o} onClick={() => onCardClick(o.id)} />
      ))}
    </div>
  );
}