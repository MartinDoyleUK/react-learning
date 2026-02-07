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
import { createContext, useContext, useState, useCallback, useLayoutEffect } from 'react';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Sync the data-theme attribute & localStorage whenever theme changes.
  // useLayoutEffect runs synchronously after DOM mutations but before
  // the browser paints, preventing a flash of the wrong theme.
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

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
