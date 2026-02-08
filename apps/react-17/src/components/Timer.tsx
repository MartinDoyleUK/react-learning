/**
 * ⚡ FEATURES: useEffect cleanup, useRef, useState
 *
 * Demonstrates useEffect cleanup guarantees:
 *   Cleanup runs before the next effect and on unmount.
 *   Scheduling can vary by interaction, so avoid depending on exact paint timing.
 *
 * Also shows useRef to hold the interval ID without causing
 * re-renders (unlike useState, mutating a ref is silent).
 */
import { useState, useEffect, useRef } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    // Cleanup: always runs before the next effect and on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const handleReset = (): void => {
    setIsRunning(false);
    setSeconds(0);
  };

  // Format seconds → mm:ss
  const display = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(
    seconds % 60
  ).padStart(2, '0')}`;

  return (
    <div className="timer-card">
      <span className="timer-display">{display}</span>
      <button
        className="btn btn-primary"
        onClick={() => setIsRunning((r) => !r)}
      >
        {isRunning ? '⏸ Pause' : '▶ Start'}
      </button>
      <button className="btn btn-secondary" onClick={handleReset}>
        ↺ Reset
      </button>
      <span className="feature-tag">useEffect cleanup</span>
    </div>
  );
}
