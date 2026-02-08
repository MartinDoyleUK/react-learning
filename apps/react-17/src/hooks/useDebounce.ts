/**
 * ⚡ FEATURE: Custom Hook — useDebounce
 *
 * Debounces a rapidly-changing value (e.g. search input) so that
 * expensive downstream computations only run after the user stops
 * typing.
 *
 * Demonstrates:
 *  • useState + useEffect working together
 *  • useEffect cleanup (clearTimeout) — cleanup runs before the next
 *    effect or on unmount; effects run after paint.
 *  • useDebugValue — displays a label in React DevTools for this hook
 */
import { useState, useEffect, useDebugValue } from 'react';

export default function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup: cancel the pending timeout when value/delay changes
    return () => clearTimeout(timer);
  }, [value, delay]);

  // ⚡ useDebugValue: shows a label in React DevTools
  //    When you inspect a component using this hook, DevTools will
  //    display "Debounce: <value>" instead of just the raw state.
  useDebugValue(debouncedValue, (val) => `Debounce: ${JSON.stringify(val)}`);

  return debouncedValue;
}
