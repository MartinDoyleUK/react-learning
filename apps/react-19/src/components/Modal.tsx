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

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ModalProps) {
  // Prevent body scrolling while modal is open.
  //
  // ⚠️ FOOT-GUN: Always return a cleanup function when your effect
  // modifies something external (DOM, subscriptions, timers). Without
  // the cleanup below, body scroll would stay locked after the modal
  // unmounts — a common source of "my page won't scroll" bugs.
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    throw new Error('Modal root element not found');
  }

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
    modalRoot
  );
}

