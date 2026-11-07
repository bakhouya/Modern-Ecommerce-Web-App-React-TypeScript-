

export function ConfirmDeleteModal({
  loading,
  onClose,
  onConfirm,
}: {
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <h3>Confirm Delete</h3>
          <button className="icon_btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal__body">
          Are you sure you want to delete this item? This action cannot be undone.
        </div>
        <div className="modal__foot">
          <button className="btn btn_ghost btn_sm" onClick={onClose}>Cancel</button>
          <button
            className="btn btn_danger btn_sm"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}