/**
 * ⚡ DEMO: Triggering an Error Boundary
 *
 * This component deliberately throws during render when the user
 * clicks the button. The surrounding ErrorBoundary catches the
 * error and shows a fallback UI.
 */
import { useState } from 'react';

export default function BuggyComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    // This throw happens during render → caught by ErrorBoundary
    throw new Error('💥 Intentional error to demonstrate Error Boundaries!');
  }

  return (
    <button
      className="btn btn-danger"
      onClick={() => setShouldThrow(true)}
      style={{ fontSize: '0.8rem' }}
    >
      💣 Trigger Error Boundary
    </button>
  );
}

