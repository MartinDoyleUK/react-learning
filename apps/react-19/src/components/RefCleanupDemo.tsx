/**
 * 🆕 REACT 19 FEATURE: Ref Cleanup Functions
 *
 * In React 19, ref callbacks can return a cleanup function — just
 * like useEffect. React calls the cleanup when the element is
 * removed from the DOM (or before the ref is re-attached).
 *
 * BEFORE (React 17/18):
 *   ref={(node) => {
 *     if (node) { // attach
 *       node.addEventListener('pointermove', handler);
 *     }
 *     // To clean up, you had to track the previous node yourself,
 *     // or wait for the ref callback to fire with `null`.
 *   }}
 *
 * AFTER (React 19):
 *   ref={(node) => {
 *     node.addEventListener('pointermove', handler);
 *     return () => node.removeEventListener('pointermove', handler);
 *   }}
 *
 * This is much cleaner — no need to store the node externally or
 * check for null.
 *
 * ⚠️ FOOT-GUN: If you pass an inline arrow function as a ref callback,
 * React creates a new function reference each render, which causes the
 * cleanup to fire and the ref to re-attach on every render. Define the
 * callback outside render or stabilise it with useCallback.
 */
import { useState, useCallback } from 'react';

export default function RefCleanupDemo() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const [attached, setAttached] = useState(true);

  // 🆕 React 19: ref callback returns a cleanup function.
  //
  // ⚠️ FOOT-GUN: We wrap this in useCallback so the function reference
  // is stable across renders. Without useCallback, React would see a
  // new function each render → call cleanup → re-attach → wasted work
  // and potentially lost state.
  const refCallback = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      setPosition({
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top),
      });
    };

    const handlePointerLeave = () => {
      setPosition(null);
    };

    node.addEventListener('pointermove', handlePointerMove);
    node.addEventListener('pointerleave', handlePointerLeave);

    // 🆕 Return cleanup — React 19 calls this when the element
    // unmounts or before the ref is re-attached.
    return () => {
      node.removeEventListener('pointermove', handlePointerMove);
      node.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <div className="batching-demo">
      <h3 style={{ marginBottom: 12 }}>
        🧹 Ref Cleanup Functions
        <span className="feature-tag">React 19</span>
      </h3>
      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          marginBottom: 12,
        }}
      >
        The ref callback below adds <code>pointermove</code> /&nbsp;
        <code>pointerleave</code> listeners and returns a cleanup that removes
        them. Toggle the box to see cleanup in action.
      </p>

      <button
        className="btn btn-secondary"
        onClick={() => setAttached((a) => !a)}
        style={{ marginBottom: 10 }}
      >
        {attached ? '🗑️ Unmount box (triggers cleanup)' : '📦 Remount box'}
      </button>

      {attached && (
        <div
          ref={refCallback}
          style={{
            height: 100,
            borderRadius: 8,
            border: '2px dashed var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'crosshair',
            userSelect: 'none',
            background: position
              ? `radial-gradient(circle at ${position.x}px ${position.y}px, var(--primary), transparent 60%)`
              : undefined,
            transition: 'background 0.05s',
          }}
        >
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {position
              ? `(${position.x}, ${position.y})`
              : 'Hover me — events attached via ref callback'}
          </span>
        </div>
      )}

      {!attached && (
        <div className="render-log">
          Box unmounted — ref cleanup removed the event listeners.
        </div>
      )}
    </div>
  );
}

