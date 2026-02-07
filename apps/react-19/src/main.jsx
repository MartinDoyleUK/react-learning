/**
 * ⚡ REACT 19 — Entry Point
 *
 * Uses createRoot (same as React 18). The concurrent renderer
 * is now the only renderer — there is no legacy mode.
 *
 * 🆕 REACT 19 HIGHLIGHTS (demonstrated throughout the app):
 *
 *  • useActionState    — form actions with built-in pending state
 *  • useFormStatus     — read parent <form> pending state
 *  • useOptimistic     — optimistic UI updates
 *  • use()             — read promises & context (even conditionally!)
 *  • ref as a prop     — no more forwardRef needed
 *  • <Context> as provider — no more <Context.Provider>
 *  • ref cleanup fns   — ref callbacks can return a cleanup
 *  • Document metadata — <title>, <meta>, <link> in components
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
