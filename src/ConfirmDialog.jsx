export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <p>{message}</p>
        <div className="dialog-actions">
          <button className="dialog-cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="dialog-confirm-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
