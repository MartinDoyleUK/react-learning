/**
 * ⚡ FEATURE: Custom Hook — useDebounce
 *
 * Debounces a rapidly-changing value (e.g. search input) so that
 * expensive downstream computations only run after the user stops
 * typing.
 *
 * Demonstrates:
 *  • useState + useEffect working together
 *  • useEffect cleanup (clearTimeout) — in React 17 cleanup runs
 *    asynchronously AFTER the screen is painted, unlike React 16
 *    where it ran synchronously before painting.
 */
import { useState, useEffect } from 'react';

export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup: cancel the pending timeout when value/delay changes
    // React 17 improvement: this cleanup fires asynchronously after
    // the screen updates, preventing visual jank.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

