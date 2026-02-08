/**
 * 🆕 REACT 18 FEATURE: Automatic Batching
 *
 * In React 17, multiple setState calls were only batched inside
 * React event handlers. Inside setTimeout, promises, or native
 * event handlers, each setState caused a separate re-render.
 *
 * React 18 automatically batches ALL setState calls, regardless
 * of where they originate. This reduces unnecessary re-renders.
 *
 * This demo lets you compare:
 *   • Event handler batching (worked in 17, still works in 18)
 *   • setTimeout batching (NEW — only works in React 18)
 *   • Promise batching (NEW — only works in React 18)
 */
import { useState, useRef } from 'react';

export default function AutoBatchingDemo() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const renderCountRef = useRef(0);

  // Track renders
  renderCountRef.current += 1;

  const handleEventBatch = (): void => {
    // Both updates batched → ONE re-render (same as React 17)
    setCount((c) => c + 1);
    setFlag((f) => !f);
  };

  const handleTimeoutBatch = (): void => {
    setTimeout(() => {
      // 🆕 React 18: these are BATCHED → ONE re-render
      // React 17: would cause TWO separate re-renders
      setCount((c) => c + 1);
      setFlag((f) => !f);
    }, 0);
  };

  const handlePromiseBatch = (): void => {
    Promise.resolve().then(() => {
      // 🆕 React 18: these are BATCHED → ONE re-render
      // React 17: would cause TWO separate re-renders
      setCount((c) => c + 1);
      setFlag((f) => !f);
    });
  };

  return (
    <div className="batching-demo">
      <h3 style={{ marginBottom: 12 }}>
        🆕 Automatic Batching
        <span className="feature-tag">React 18</span>
      </h3>
      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          marginBottom: 12,
        }}
      >
        All three buttons update two state values. In React 18, every case
        results in a single re-render. In React 17, setTimeout and Promise
        would each cause two re-renders.
      </p>
      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          marginBottom: 10,
        }}
      >
        <button className="btn btn-primary" onClick={handleEventBatch}>
          Event Handler
        </button>
        <button className="btn btn-secondary" onClick={handleTimeoutBatch}>
          setTimeout
        </button>
        <button className="btn btn-secondary" onClick={handlePromiseBatch}>
          Promise.then
        </button>
      </div>
      <div className="render-log">
        Count: {count} | Flag: {flag ? 'true' : 'false'} | Renders:{' '}
        {renderCountRef.current}
      </div>
    </div>
  );
}

