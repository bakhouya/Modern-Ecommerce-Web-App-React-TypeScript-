
export function OrderStatusBadge({
  title,
  color,
}: {
  title: string;
  color: string;
}) {
  return (
    <span
      className="status_badge"
      style={{
        color,
        background: `${color}18`,
        border: `1px solid ${color}40`,
      }}
    >
      {title}
    </span>
  );
}