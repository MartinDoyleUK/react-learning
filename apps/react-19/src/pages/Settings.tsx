/**
 * 🆕 REACT 19 FEATURES: use() hook, Document Metadata
 *
 * use() — a new hook that can:
 *   1. Read context (like useContext, but callable inside if/loops)
 *   2. Read promise values (unwrap async data)
 *
 * Document Metadata — React 19 supports rendering <title>, <meta>,
 * and <link> tags inside components. React hoists them to <head>.
 */
import { use } from 'react';
import ThemeContext from '../context/ThemeContext';
import useWindowSize from '../hooks/useWindowSize';

export default function Settings() {
  // 🆕 use(): reads context — works identically to useContext here,
  // but unlike useContext, use() CAN be called conditionally!
  const themeCtx = use(ThemeContext);
  if (!themeCtx) {
    throw new Error('Settings must be used within a ThemeProvider');
  }
  const { theme, toggleTheme } = themeCtx;
  const { width, height } = useWindowSize();

  return (
    <div className="settings">
      {/* 🆕 Document Metadata: React 19 hoists this to <head> */}
      <title>Settings — TaskFlow</title>
      <meta name="description" content="TaskFlow settings page" />

      <h2>⚙️ Settings</h2>

      <div className="settings-group">
        <label>Theme</label>
        <button className="btn btn-secondary" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <p>Current: {theme} mode</p>
      </div>

      <div className="settings-group">
        <label>
          Window Size
          <span className="feature-tag">useSyncExternalStore</span>
        </label>
        <p>
          {width} × {height}px
        </p>
      </div>

      <div className="settings-group">
        <label>
          use() Hook Demo
          <span className="feature-tag">React 19</span>
        </label>
        <p>
          The theme value above was read with <code>use(ThemeContext)</code>{' '}
          instead of <code>useContext(ThemeContext)</code>. Unlike useContext,
          the <code>use()</code> hook can be called inside conditionals, loops,
          and after early returns.
        </p>
      </div>

      {/* 🆕 Asset Loading: React 19 deduplicates and hoists resource hints */}
      <div className="settings-group">
        <label>
          Asset Loading
          <span className="feature-tag">React 19</span>
        </label>
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
          }}
        >
          React 19 can hoist <code>{'<link rel="preload">'}</code>,{' '}
          <code>{'<script async>'}</code>, and{' '}
          <code>{'<link rel="stylesheet">'}</code> to <code>{'<head>'}</code>.
          It deduplicates resources so the same asset is only loaded once, even
          if multiple components request it.
        </p>
        {/*
          🆕 React 19 automatically hoists these to <head> and deduplicates:
          - Stylesheets with precedence are ordered correctly
          - Preloads hint to the browser to start fetching early
          - Async scripts are deduplicated and loaded once
        */}
        <link rel="preload" href="/asset-loading-demo.css" as="style" />
      </div>

      <div className="settings-group">
        <label>🆕 React 19 Highlights</label>
        <ul
          style={{
            paddingLeft: '20px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
          }}
        >
          <li>
            <strong>useActionState</strong> — form actions with built-in pending
            state
          </li>
          <li>
            <strong>useFormStatus</strong> — read parent form's pending state
          </li>
          <li>
            <strong>useOptimistic</strong> — instant optimistic UI updates
          </li>
          <li>
            <strong>use()</strong> — read context & promises, even conditionally
          </li>
          <li>
            <strong>ref as prop</strong> — no more forwardRef needed
          </li>
          <li>
            <strong>Context as provider</strong> — {'<Context value={}>'} replaces{' '}
            {'<Context.Provider>'}
          </li>
          <li>
            <strong>Document metadata</strong> — {'<title>'}, {'<meta>'}, {'<link>'}{' '}
            in components
          </li>
          <li>
            <strong>ref cleanup</strong> — ref callbacks can return cleanup functions
          </li>
          <li>
            <strong>Asset loading</strong> — {'<link>'}, {'<script async>'} deduplication
            and hoisting
          </li>
        </ul>
      </div>
    </div>
  );
}
