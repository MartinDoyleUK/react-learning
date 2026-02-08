/**
 * ⚡ FEATURE: useImperativeHandle demo
 *
 * This component demonstrates how a parent interacts with a child
 * via a custom imperative API exposed by useImperativeHandle.
 *
 * The parent gets a ref with { focus, clear, selectAll, getValue }
 * instead of the raw <input> DOM element.
 *
 * In React 18, FancyInput uses forwardRef to accept the ref.
 */
import { useRef, useState } from 'react';
import FancyInput, { type FancyInputHandle } from './FancyInput';

export default function ImperativeHandleDemo() {
  const fancyRef = useRef<FancyInputHandle>(null);
  const [lastValue, setLastValue] = useState('');

  return (
    <div className="batching-demo">
      <h3 style={{ marginBottom: 12 }}>
        🎛️ useImperativeHandle
        <span className="feature-tag">Custom Ref API</span>
      </h3>
      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          marginBottom: 12,
        }}
      >
        The parent calls <code>ref.focus()</code>, <code>ref.clear()</code>, and{' '}
        <code>ref.selectAll()</code> — not raw DOM methods. The child controls
        exactly what the parent can do. Uses <code>forwardRef</code> in React 18.
      </p>

      <FancyInput ref={fancyRef} placeholder="Type something, then try the buttons…" />

      <div
        style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}
      >
        <button
          className="btn btn-primary"
          onClick={() => fancyRef.current?.focus()}
        >
          Focus
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => fancyRef.current?.selectAll()}
        >
          Select All
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => fancyRef.current?.clear()}
        >
          Clear
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            const val = fancyRef.current?.getValue() ?? '';
            setLastValue(val);
          }}
        >
          Get Value
        </button>
      </div>

      {lastValue && (
        <div className="render-log" style={{ marginTop: 8 }}>
          getValue() returned: &quot;{lastValue}&quot;
        </div>
      )}
    </div>
  );
}

