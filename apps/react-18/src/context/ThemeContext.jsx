/**
 * ⚡ FEATURE: Context API (React 16.3+, still the pattern in React 17)
 *
 * createContext + Provider + useContext is the standard way to share
 * values across the component tree without prop-drilling.
 *
 * In React 17 you MUST wrap children with <ThemeContext.Provider>.
 * (React 19 will simplify this — see the React 19 app.)
 */
import { createContext, useContext, useState, useCallback } from 'react';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Read initial preference from localStorage
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  // Set the initial data-theme attribute on mount
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }

  return (
    // React 17: must use <ThemeContext.Provider value={…}>
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * ⚡ FEATURE: Custom Hook wrapping useContext
 * Provides a clean API and guards against using the context outside
 * its Provider.
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}

export default ThemeContext;

