/**
 * ⚡ FEATURE: Context API
 * 🆕 REACT 19: Context as Provider
 *
 * In React 19, you can render <ThemeContext value={…}> directly
 * instead of <ThemeContext.Provider value={…}>. The .Provider
 * wrapper is no longer needed (though it still works for
 * backwards compatibility).
 *
 * Also demonstrates use() vs useContext — see Settings.jsx for
 * the use() version.
 */
import { createContext, useContext, useState, useCallback } from 'react';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
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

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }

  return (
    // 🆕 React 19: <ThemeContext value={…}> — no .Provider needed!
    // Before: <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <ThemeContext value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}

export default ThemeContext;
