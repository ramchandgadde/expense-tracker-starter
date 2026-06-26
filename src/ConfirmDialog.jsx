import { useEffect } from 'react'

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  return (
    <div
      className="dialog-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-message"
      >
        <h2 id="dialog-title" className="dialog__title">Delete transaction?</h2>
        <p id="dialog-message" className="dialog__message">{message}</p>
        <div className="dialog-actions">
          <button className="dialog-cancel-btn" onClick={onCancel} autoFocus>
            Cancel
          </button>
          <button className="dialog-confirm-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
