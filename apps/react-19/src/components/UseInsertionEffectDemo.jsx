/**
 * 🆕 REACT 18+ FEATURE: useInsertionEffect
 *
 * useInsertionEffect fires BEFORE React makes any DOM mutations.
 * It is designed exclusively for CSS-in-JS libraries that need to
 * inject <style> tags before the browser calculates layout.
 *
 * Effect timing order:
 *   1. useInsertionEffect  → fires BEFORE DOM mutations
 *   2. useLayoutEffect     → fires AFTER DOM mutations, before paint
 *   3. useEffect           → fires AFTER paint
 *
 * ⚠️ IMPORTANT: This hook is for library authors. Application code
 * should almost never use it. Use useLayoutEffect for DOM measurement
 * and useEffect for everything else.
 *
 * Limitations:
 *  • Cannot update state inside useInsertionEffect
 *  • Cannot access refs (DOM doesn't exist yet)
 *  • Can only insert styles / do non-React DOM work
 */
import { useState, useInsertionEffect, useLayoutEffect, useEffect, useRef } from 'react';

// Simulates a CSS-in-JS style injection
function useCSS(rule) {
  useInsertionEffect(() => {
    // 🆕 useInsertionEffect: inject style BEFORE DOM mutations
    // This ensures styles are available when the browser calculates layout.
    const style = document.createElement('style');
    style.dataset.source = 'useInsertionEffect-demo';
    style.textContent = rule;
    document.head.appendChild(style);

    // Cleanup: remove the style when rule changes or component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, [rule]);
}

export default function UseInsertionEffectDemo() {
  const [hue, setHue] = useState(200);
  const logRef = useRef([]);
  const [, forceRender] = useState(0);

  // 🆕 useInsertionEffect: injects the CSS rule before layout
  useCSS(`.insertion-demo-box { background: hsl(${hue}, 70%, 60%); }`);

  // Track the order in which effects fire
  useInsertionEffect(() => {
    logRef.current = [...logRef.current, '1️⃣ useInsertionEffect'].slice(-6);
  }, [hue]);

  useLayoutEffect(() => {
    logRef.current = [...logRef.current, '2️⃣ useLayoutEffect'].slice(-6);
  }, [hue]);

  useEffect(() => {
    logRef.current = [...logRef.current, '3️⃣ useEffect'].slice(-6);
    forceRender((c) => c + 1); // trigger re-render to show log
  }, [hue]);

  return (
    <div className="batching-demo">
      <h3 style={{ marginBottom: 12 }}>
        🎨 useInsertionEffect
        <span className="feature-tag">React 18+</span>
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
        Fires <strong>before</strong> DOM mutations — designed for CSS-in-JS
        style injection. Drag the slider to inject new styles via{' '}
        <code>useInsertionEffect</code>.
      </p>

      <div
        className="insertion-demo-box"
        style={{
          height: 40,
          borderRadius: 8,
          marginBottom: 10,
          transition: 'background 0.2s',
        }}
      />

      <div style={{ marginBottom: 10 }}>
        <label style={{ fontSize: '0.85rem' }}>
          Hue: {hue}°{' '}
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            style={{ verticalAlign: 'middle', width: 200 }}
          />
        </label>
      </div>

      <div className="render-log" style={{ fontSize: '0.8rem' }}>
        <strong>Effect execution order:</strong>
        <br />
        {logRef.current.map((entry, i) => (
          <span key={i}>
            {entry}
            {i < logRef.current.length - 1 && ' → '}
          </span>
        ))}
      </div>
    </div>
  );
}

