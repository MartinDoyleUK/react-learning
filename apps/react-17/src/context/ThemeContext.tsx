/**
 * ⚡ FEATURE: Context API (React 16.3+, still the pattern in React 17)
 *
 * createContext + Provider + useContext is the standard way to share
 * values across the component tree without prop-drilling.
 *
 * To provide a value, wrap children with <ThemeContext.Provider>.
 *
 * useLayoutEffect synchronises the data-theme DOM attribute with state.
 * It fires after DOM mutations but before the browser paints, so the
 * user never sees a flash of the wrong theme.
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

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Read initial preference from localStorage
    return (localStorage.getItem('theme') as Theme) || 'light';
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
    // Provide a value with <ThemeContext.Provider value={…}>
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

