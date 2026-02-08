/**
 * ⚡ FEATURE: Context API
 * 🆕 REACT 19: Context as Provider
 *
 * In React 19, you can render <ThemeContext value={…}> directly
 * instead of <ThemeContext.Provider value={…}>. The .Provider
 * wrapper is no longer needed (though it still works for
 * backwards compatibility).
 *
 * Also demonstrates use() vs useContext — see Settings.tsx for
 * the use() version.
 */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useLayoutEffect,
  type ReactNode,
} from 'react';
import type { Theme, ThemeContextValue } from '../types';

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark';
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme');
    return isTheme(storedTheme) ? storedTheme : 'light';
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

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}

export default ThemeContext;
