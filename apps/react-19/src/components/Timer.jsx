/**
 * ⚡ FEATURES: useEffect cleanup, useRef, useState
 *
 * Demonstrates useEffect cleanup timing in React 17:
 *   React 16: cleanup ran synchronously before the new effect.
 *   React 17: cleanup runs ASYNCHRONOUSLY after the screen updates.
 *   This change prevents blocking the browser paint.
 *
 * Also shows useRef to hold the interval ID without causing
 * re-renders (unlike useState, mutating a ref is silent).
 */
import { useState, useEffect, useRef } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    // Cleanup: React 17 runs this asynchronously after paint
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const handleReset = () => {
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

