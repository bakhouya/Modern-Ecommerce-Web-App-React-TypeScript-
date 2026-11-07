

import { useState } from "react";
import type { OrderStatus } from "../../../types/ordersTyes";

export function ChangeStatusModal({
  statuses,
  currentId,
  loading,
  onClose,
  onConfirm,
}: {
  statuses: OrderStatus[];
  currentId: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
}) {
  const [selected, setSelected] = useState(currentId);

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <h3>Change Order Status</h3>
          <button className="icon_btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal__body">
          <select value={selected} onChange={(e) => setSelected(e.target.value)}>
            {statuses.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>
        <div className="modal__foot">
          <button className="btn btn_ghost btn_sm" onClick={onClose}>Cancel</button>
          <button
            className="btn btn_primary btn_sm"
            onClick={() => onConfirm(selected)}
            disabled={loading || selected === currentId}
          >
            {loading ? "Saving..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}