/**
 * ⚡ REACT 17 — Entry Point
 *
 * Key React 17 features demonstrated here:
 *  • New JSX Transform — no need to `import React` in every JSX file
 *  • ReactDOM.render() — the "legacy" root API (replaced by createRoot in 18)
 *  • Event delegation now attaches to the root container, NOT document
 *    (this fixed issues when mixing React versions / micro-frontends)
 */
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// React 17 uses ReactDOM.render (the "legacy" root API).
// StrictMode activates additional dev-time checks and warnings.
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

