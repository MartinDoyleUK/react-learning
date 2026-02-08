/**
 * ⚡ REACT 18 — Entry Point
 *
 * 🆕 WHAT CHANGED FROM REACT 17:
 *
 *  • createRoot API — replaces ReactDOM.render(). The new "concurrent
 *    root" unlocks all React 18 features (automatic batching,
 *    transitions, Suspense improvements, etc.).
 *
 *  • ReactDOM.render() still works but is deprecated and runs in
 *    "legacy mode" — none of the new concurrent features activate.
 *
 *  • StrictMode now fires effects twice in development to help you
 *    find bugs with missing cleanup functions.
 */
import { StrictMode } from 'react';
// 🆕 Import from 'react-dom/client' instead of 'react-dom'
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// 🆕 React 18: createRoot enables the concurrent renderer
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

