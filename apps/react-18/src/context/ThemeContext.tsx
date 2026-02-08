/**
 * ⚡ FEATURE: Context API (React 16.3+, still the pattern in React 18)
 *
 * createContext + Provider + useContext is the standard way to share
 * values across the component tree without prop-drilling.
 *
 * In React 18 you MUST wrap children with <ThemeContext.Provider>.
 * (React 19 will simplify this — see the React 19 app.)
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
    // Read initial preference from localStorage
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
    // React 18: must use <ThemeContext.Provider value={…}>
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
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}

export default ThemeContext;
