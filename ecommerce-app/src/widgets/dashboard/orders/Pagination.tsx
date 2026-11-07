import type { PaginationTypes } from "../../../types/basicTypes";




export function Pagination({
  pagination,
  onChange,
}: {
  pagination: PaginationTypes;
  onChange: (page: number) => void;
}) {
  const page = pagination.current_page ?? 1;
  const totalPages = Math.ceil(pagination.count / (pagination.page_size ?? 10)) || 1;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === totalPages);

  return (
    <div className="orders_pagination">
      <div className="orders_pagination__info">
        Page {page} of {totalPages} · {pagination.count} total
      </div>
      <div className="orders_pagination__controls">
        <button
          className="orders_pagination__btn"
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
        >
          ←
        </button>
        {pages.map((p, i, arr) => {
          const prev = arr[i - 1];
          const gap = prev && p - prev > 1;
          return (
            <span key={p} style={{ display: "flex", gap: 6 }}>
              {gap && <span style={{ padding: "0 6px", color: "var(--txt-light)" }}>…</span>}
              <button
                className={`orders_pagination__btn ${p === page ? "orders_pagination__btn_active" : ""}`}
                onClick={() => onChange(p)}
              >
                {p}
              </button>
            </span>
          );
        })}
        <button
          className="orders_pagination__btn"
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
        >
          →
        </button>
      </div>
    </div>
  );
}