


import type { Order } from "../../../types/ordersTyes";
import { OrderStatusBadge } from "./OrderStatusBadge";

export function OrderCard({
  order,
  onClick,
}: {
  order: Order;
  onClick: () => void;
}) {
  return (
    <article className="order_card" onClick={onClick} style={{ ["--card-accent" as any]: order.status.color }}>

        <div className="order_card__top">
            <span className="text text_sm weight_600 text_primary">#{order.order_code}</span>
            <OrderStatusBadge title={order.status.title} color={order.status.color} />
        </div>
        
        <div className="body_cart_order"> 
            <div className="order_card__client">
                <span className="text text_md weight_600">{order.client_name}</span>
                <span className="text text_sm">{order.client_phone}</span>
            </div>
            <div className="order_card__stats">
                <div className="order_card__stat">
                    <span className="text text_sm">Products: </span>
                    <span className="text text_lg weight_600 text_center">{order.products_count}</span>
                </div>
                <div className="slash"></div>
                <div className="order_card__stat">
                    <span className="text text_sm">Variants: </span>
                    <span className="text text_lg weight_600 text_center">{order.variants_count}</span>
                </div>
                <div className="slash"></div>
                <span className="text text_lg weight_600">{order.total_price} DH</span>
            </div>
        </div>

        <div className="order_card__footer">
            <div className="order_card__date">
                <span className="text text_xs"> {new Date(order.created_at).toLocaleDateString()}</span>
                <span className="text text_xs" style={{ color: "var(--accent)", fontWeight: 600 }}>View details →</span>
            </div>
        </div>
    </article>
  );
}