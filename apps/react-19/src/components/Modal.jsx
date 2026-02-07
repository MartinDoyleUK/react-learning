/**
 * ⚡ FEATURE: Portals (createPortal)
 *
 * Portals let you render children into a DOM node that exists
 * OUTSIDE the parent component's DOM hierarchy. This is perfect
 * for modals, tooltips, and toasts — the rendered output escapes
 * overflow:hidden containers and z-index stacking contexts.
 *
 * Even though the modal renders in #modal-root, React events
 * still bubble through the React tree (not the DOM tree).
 */
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ isOpen, title, message, onConfirm, onCancel }) {
  // Prevent body scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // createPortal: renders this JSX into #modal-root, not inside
  // the parent's DOM tree
  return createPortal(
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevent overlay click
      >
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

