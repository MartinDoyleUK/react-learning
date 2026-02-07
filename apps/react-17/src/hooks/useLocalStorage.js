/**
 * ⚡ FEATURE: Custom Hook — useLocalStorage
 *
 * Custom hooks let you extract and reuse stateful logic.
 * This hook synchronises a piece of state with localStorage
 * so it persists across page reloads.
 *
 * Demonstrates:
 *  • Lazy initialiser function for useState
 *  • useEffect for side-effect synchronisation
 *  • JSON serialisation / deserialisation
 *  • useDebugValue — displays a label in React DevTools
 */
import { useState, useEffect, useDebugValue } from 'react';

export default function useLocalStorage(key, defaultValue) {
  // Lazy initialiser — only runs on first render
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  // Sync to localStorage whenever key or value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked — fail silently
    }
  }, [key, value]);

  // ⚡ useDebugValue: shows "key: value" in React DevTools
  //    Only the formatter function runs when DevTools is open.
  useDebugValue({ key, value }, ({ key: k, value: v }) => `${k}: ${JSON.stringify(v)}`);

  return [value, setValue];
}

