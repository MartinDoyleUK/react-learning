/**
 * ⚡ FEATURE: React.lazy + Suspense (Code Splitting)
 * 🆕 REACT 18: useSyncExternalStore demo (window size)
 *
 * This page is lazy-loaded and also demonstrates
 * useSyncExternalStore via the useWindowSize hook.
 */
import { useTheme } from '../context/ThemeContext';
import useWindowSize from '../hooks/useWindowSize';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  // 🆕 useSyncExternalStore: subscribes to window resize
  const { width, height } = useWindowSize();

  return (
    <div className="settings">
      <h2>⚙️ Settings</h2>

      <div className="settings-group">
        <label>Theme</label>
        <button className="btn btn-secondary" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <p>Current: {theme} mode</p>
      </div>

      {/* 🆕 useSyncExternalStore: live window dimensions */}
      <div className="settings-group">
        <label>
          Window Size
          <span className="feature-tag">useSyncExternalStore</span>
        </label>
        <p>
          {width} × {height}px — resize your browser to see this update in
          real-time via useSyncExternalStore.
        </p>
      </div>

      <div className="settings-group">
        <label>About</label>
        <p>
          This app demonstrates React 18 features building on top of
          the React 17 foundation. New features include createRoot,
          automatic batching, useTransition, useDeferredValue, useId,
          and useSyncExternalStore.
        </p>
      </div>

      <div className="settings-group">
        <label>🆕 React 18 Highlights</label>
        <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <li><strong>createRoot</strong> — new concurrent root API (replaces ReactDOM.render)</li>
          <li><strong>Automatic Batching</strong> — setState batched everywhere, not just event handlers</li>
          <li><strong>useTransition</strong> — mark updates as non-urgent for responsive UIs</li>
          <li><strong>useDeferredValue</strong> — defer expensive re-renders</li>
          <li><strong>useId</strong> — generate stable unique IDs for accessibility</li>
          <li><strong>useSyncExternalStore</strong> — safe subscription to external stores</li>
          <li><strong>Strict Mode</strong> — double-fires effects in dev to catch cleanup bugs</li>
          <li><strong>flushSync</strong> — opt out of batching for immediate DOM updates</li>
          <li><strong>useInsertionEffect</strong> — inject styles before DOM mutations (CSS-in-JS)</li>
        </ul>
      </div>
    </div>
  );
}
