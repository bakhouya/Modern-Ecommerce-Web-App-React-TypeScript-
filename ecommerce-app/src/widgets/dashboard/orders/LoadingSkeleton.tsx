

export function OrdersSkeleton() {
  return (
    <div className="orders_grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="order_card" style={{ pointerEvents: "none" }}>
          <div className="skeleton" style={{ height: 14, width: "55%" }} />
          <div className="skeleton" style={{ height: 18, width: "70%" }} />
          <div className="skeleton" style={{ height: 12, width: "45%" }} />
          <div style={{ display: "flex", gap: 6 }}>
            <div className="skeleton" style={{ height: 22, width: 70, borderRadius: 999 }} />
            <div className="skeleton" style={{ height: 22, width: 90, borderRadius: 999 }} />
          </div>
          <div className="skeleton" style={{ height: 14, width: "100%", marginTop: 12 }} />
        </div>
      ))}
    </div>
  );
}

export function OrderDetailsSkeleton() {
  return (
    <div className="orders_module">
      <div className="skeleton" style={{ height: 28, width: 200 }} />
      <div style={{ display: "flex", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
        <div className="skeleton" style={{ flex: 1, minWidth: 300, height: 200 }} />
        <div className="skeleton" style={{ width: 340, height: 200 }} />
      </div>
    </div>
  );
}