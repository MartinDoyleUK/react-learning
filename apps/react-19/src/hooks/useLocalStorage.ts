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

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Lazy initialiser — only runs on first render
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      // ⚠️ FOOT-GUN: `as T` is a type assertion — it tells TypeScript
      // "trust me, this is T" without any runtime validation. If the
      // stored JSON doesn't actually match T, you'll get silent bugs.
      // In production code, validate with a schema library (e.g. Zod)
      // or a type guard before casting.
      return stored !== null ? (JSON.parse(stored) as T) : defaultValue;
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
  useDebugValue(
    { key, value },
    ({ key: k, value: v }) => `${k}: ${JSON.stringify(v)}`
  );

  return [value, setValue];
}

