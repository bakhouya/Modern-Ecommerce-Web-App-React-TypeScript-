

import { useState } from "react";

export function AssignDeliveryModal({
  loading,
  onClose,
  onConfirm,
}: {
  loading?: boolean;
  onClose: () => void;
  onConfirm: (deliveryId: string) => void;
}) {
  const [deliveryId, setDeliveryId] = useState("");

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <h3>Assign Delivery</h3>
          <button className="icon_btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal__body">
          <input
            placeholder="Delivery agent ID"
            value={deliveryId}
            onChange={(e) => setDeliveryId(e.target.value)}
          />
        </div>
        <div className="modal__foot">
          <button className="btn btn_ghost btn_sm" onClick={onClose}>Cancel</button>
          <button
            className="btn btn_primary btn_sm"
            onClick={() => onConfirm(deliveryId)}
            disabled={loading || !deliveryId}
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
}