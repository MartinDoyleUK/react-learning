/**
 * 🆕 REACT 18+ FEATURE: flushSync
 *
 * React 18+ batches ALL setState calls automatically. But sometimes
 * you need a state update to flush to the DOM immediately — for
 * example, when you need to measure the DOM or scroll after an
 * update.
 *
 * flushSync(callback) forces React to flush state updates inside
 * the callback synchronously, before moving on. Use it sparingly —
 * it bypasses batching and can hurt performance.
 *
 * Common use cases:
 *  • Scrolling to newly added content
 *  • Measuring DOM layout after a state change
 *  • Third-party library integrations that read the DOM
 */
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';

export default function FlushSyncDemo() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const listRef = useRef<HTMLDivElement>(null);
  const [renderCount, setRenderCount] = useState(0);

  // Normal batched add — scroll happens before DOM updates
  const handleBatchedAdd = (): void => {
    setItems((prev) => [...prev, `Item ${prev.length + 1}`]);
    setRenderCount((c) => c + 1);
    // ❌ This scroll might not reach the new item because React
    //    hasn't flushed the DOM update yet
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  };

  // 🆕 flushSync add — DOM updates before scroll
  const handleFlushSyncAdd = (): void => {
    // flushSync forces React to update the DOM immediately
    flushSync(() => {
      setItems((prev) => [...prev, `Item ${prev.length + 1}`]);
    });
    // ✅ Now the DOM has the new item — scroll will reach it
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    // This second update is separate (not batched with the first)
    setRenderCount((c) => c + 1);
  };

  const handleReset = (): void => {
    setItems(['Item 1', 'Item 2', 'Item 3']);
    setRenderCount(0);
  };

  return (
    <div className="batching-demo">
      <h3 style={{ marginBottom: 12 }}>
        🔄 flushSync
        <span className="feature-tag">React 18+</span>
      </h3>
      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          marginBottom: 12,
        }}
      >
        <code>flushSync</code> forces React to update the DOM synchronously,
        bypassing automatic batching. Useful when you need to scroll to or
        measure a freshly rendered element.
      </p>

      <div
        ref={listRef}
        style={{
          maxHeight: 120,
          overflowY: 'auto',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: '4px 8px',
          marginBottom: 10,
          fontSize: '0.85rem',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              padding: '4px 0',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <div
        style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}
      >
        <button className="btn btn-secondary" onClick={handleBatchedAdd}>
          Add (Batched)
        </button>
        <button className="btn btn-primary" onClick={handleFlushSyncAdd}>
          Add (flushSync) ✅
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="render-log">
        Items: {items.length} | Extra renders from flushSync: {renderCount}
      </div>
    </div>
  );
}

