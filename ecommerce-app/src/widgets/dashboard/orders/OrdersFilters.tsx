import type { OrderStatus } from "../../../types/ordersTyes";



export function OrdersFilters({
  statuses,
  value,
  onChange,
}: {
  statuses: OrderStatus[];
  value: { search?: string; status?: string; order_type?: string };
  onChange: (v: { search?: string; status?: string; order_type?: string }) => void;
}) {
  const update = (patch: Partial<typeof value>) =>
    onChange({ ...value, ...patch });

  return (
    <div className="orders_filters">
      <div className="orders_filters__field">
        <label>Search</label>
        <input
          placeholder="Order code / client..."
          value={value.search ?? ""}
          onChange={(e) => update({ search: e.target.value })}
        />
      </div>
      <div className="orders_filters__field">
        <label>Status</label>
        <select
          value={value.status ?? ""}
          onChange={(e) => update({ status: e.target.value || undefined })}
        >
          <option value="">All</option>
          {statuses.map((s) => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>
      </div>
      <div className="orders_filters__field">
        <label>Type</label>
        <select
          value={value.order_type ?? ""}
          onChange={(e) => update({ order_type: e.target.value || undefined })}
        >
          <option value="">All</option>
          <option value="delivery">Delivery</option>
          <option value="pickup">Pickup</option>
        </select>
      </div>
    </div>
  );
}