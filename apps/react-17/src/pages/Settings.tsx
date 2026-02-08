/**
 * ⚡ FEATURE: React.lazy + Suspense (Code Splitting)
 *
 * This component is loaded via React.lazy() in App.tsx:
 *   const Settings = React.lazy(() => import('./pages/Settings'));
 *
 * It won't be included in the initial JS bundle — it's split into
 * a separate chunk and fetched on demand when the user navigates
 * to the Settings tab. Suspense shows a fallback while loading.
 *
 * Also demonstrates useContext for reading theme.
 */
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

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

      <div className="settings-group">
        <label>About</label>
        <p>
          This app demonstrates core React 17 features including Hooks,
          Context, Portals, Error Boundaries, React.memo, code splitting
          with React.lazy & Suspense, and more.
        </p>
      </div>

      <div className="settings-group">
        <label>React 17 Highlights</label>
        <ul
          style={{
            paddingLeft: '20px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
          }}
        >
          <li>
            New JSX Transform (no <code>import React</code> needed)
          </li>
          <li>Event delegation on root container (not document)</li>
          <li>Async useEffect cleanup timing</li>
          <li>
            No new developer-facing APIs — a &quot;stepping stone&quot; release
          </li>
        </ul>
      </div>
    </div>
  );
}

