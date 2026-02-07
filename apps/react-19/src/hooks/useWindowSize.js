/**
 * 🆕 REACT 18 FEATURE: useSyncExternalStore
 *
 * useSyncExternalStore is the recommended way to subscribe to
 * external (non-React) data sources. It guarantees that the
 * component sees a consistent snapshot of the store, even during
 * concurrent rendering.
 *
 * This hook subscribes to window resize events as a demonstration.
 * The same pattern works for Redux stores, browser APIs, etc.
 *
 * Parameters:
 *   subscribe(callback)  → attach the listener, return unsubscribe
 *   getSnapshot()        → return the current value (must be stable)
 *   getServerSnapshot()  → optional, for SSR
 */
import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getWidthSnapshot() {
  return window.innerWidth;
}

function getHeightSnapshot() {
  return window.innerHeight;
}

export default function useWindowSize() {
  const width = useSyncExternalStore(subscribe, getWidthSnapshot);
  const height = useSyncExternalStore(subscribe, getHeightSnapshot);
  return { width, height };
}

