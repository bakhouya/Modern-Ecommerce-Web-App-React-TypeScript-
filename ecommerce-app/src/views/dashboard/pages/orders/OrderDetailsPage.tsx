

import { useParams, useNavigate } from "react-router-dom";
import { useOrderDetails, useUpdateVariantQuantity } from "../../../../controllers/useOrder";
import { EmptyState } from "../../../../widgets/dashboard/orders/EmptyState";
import { OrderStatusBadge } from "../../../../widgets/dashboard/orders/OrderStatusBadge";
import { ProductCard } from "../../../../widgets/dashboard/orders/ProductCard";
import { LoadingDisplay } from "../../../../components/ui/LoadingDisplay";
import { useState } from "react";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: order, isLoading } = useOrderDetails(id);

  const updQty = useUpdateVariantQuantity();

  const [modal, setModal] = useState< | { type: "status" } | { type: "delivery" } | { type: "delProduct"; id: string } | { type: "delVariant"; id: string } | null>(null);

  if (isLoading) return <LoadingDisplay />;
  if (modal) return "";
  if (!order) return <EmptyState title="Order not found" />;

  return (
    <section className="wrapper_details_order_page">

      <div className="orders_header">
        <div className="orders_header__left flex_start_center gap_12">
            <button className="btn btn_ghost btn_sm" onClick={() => navigate(-1)}>← Back </button>
            <div className="text text_xl weight_600">Order <span style={{ color: "var(--accent)" }}>#{order.order_code}</span></div>
            {/* <div className="text text_sm"> {new Date(order.created_at).toLocaleString()} · {order.order_type} </div> */}
        </div>

        <div className="orders_header__actions">
          <OrderStatusBadge title={order.status_details.title} color={order.status_details.color}/>
          <button className="btn btn_primary" onClick={() => setModal({ type: "status" })}>
            Change Status
          </button>
          <button className="btn btn_ghost" onClick={() => setModal({ type: "delivery" })}>
            Assign Delivery
          </button>
        </div>
      </div>

      <div className="order_details_admin">
        <div className="order_details_admin__main">
          <section className="panel">
            <header className="panel__head">
              <div className="text text_lg weight_600">Client Info</div>
            </header>
            <div className="panel__body">
              <div className="info_list">
                <InfoRow label="Nom et prenom" value={order.client_name} />
                <InfoRow label="téléphone" value={order.client_phone} />
                <InfoRow label="La ville" value={order.city_details?.title} />
                <InfoRow label="Branch" value={order.branch_details?.title} />
                <InfoRow label="Address" value={order.client_address} />
                <InfoRow label="Payment" value={order.payment_status} />
                <InfoRow label="Shipping" value={order.shipping_type} />
                <InfoRow label="Note" value={order.client_note || "—"} />
              </div>
            </div>
          </section>
        </div>

        <aside className="order_details_admin__side">
            <section className="panel">
                <header className="panel__head">
                <div className="text text_lg weight_600">
                    Products <span style={{ color: "var(--accent)" }}> ({order.products.length}) </span>
                </div>
                </header>
                <div className="panel__body">
                {order.products.map((p) => (
                    <ProductCard
                    key={p.id}
                    product={p}
                    onDeleteProduct={() =>
                        setModal({ type: "delProduct", id: p.id })
                    }
                    onDeleteVariant={(vid) =>
                        setModal({ type: "delVariant", id: vid })
                    }
                    onUpdateQty={(vid, qty) =>
                        updQty.mutate({ id: vid, quantity: qty })
                    }
                    updatingQty={updQty.isPending}
                    />
                ))}
                </div>
            </section>
            <section className="panel">
                <header className="panel__head">
                <div className="text text_lg weight_600">Summary</div>
                </header>
                <div className="panel__body">
                <div className="summary_list">
                    <div className="summary_list__row">
                    <span className="text text_sm">Shipping</span>
                    <span className="text text_sm">{order.shipping_cost} DH</span>
                    </div>
                    <div className="summary_list__row">
                    <span className="text text_sm">Agent</span>
                    <span className="text text_sm">{order.agent_details?.id ?? "—"}</span>
                    </div>
                    <div className="summary_list__row">
                    <span className="text text_sm">Total</span>
                    <span className="text text_md weight_600 text_primary">{order.total} DH</span>
                    </div>
                </div>
                </div>
            </section>
        </aside>
      </div>

    </section>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="info_list__row">
      <div className="text text_sm">{label}</div>
      <div className="text text_sm">{value || "—"}</div>
    </div>
  );
}