
export function EmptyState({ title, text }: { title: string; text?: string }) {
  return (
    <div className="orders_empty">
      <div className="orders_empty__icon">📭</div>
      <div className="orders_empty__title">{title}</div>
      {text && <div className="orders_empty__text">{text}</div>}
    </div>
  );
}