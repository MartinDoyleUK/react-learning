/**
 * ⚡ FEATURES: useContext, Event Handling
 *
 * Consumes ThemeContext via the useTheme custom hook.
 * The theme toggle demonstrates React's synthetic event system —
 * in React 17, events are attached to the root container rather
 * than the document (a breaking change from React 16).
 */
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  // useContext (via custom hook) to read & modify theme
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1>
        📋 Task<span>Flow</span>
      </h1>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
}

