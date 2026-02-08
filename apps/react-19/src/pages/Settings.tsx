/**
 * 🆕 REACT 19 FEATURES: use() hook, Document Metadata
 *
 * use() — a new hook that can:
 *   1. Read context (like useContext, but callable inside if/loops)
 *   2. Read promise values (unwrap async data inside a Suspense boundary)
 *
 * When use() is given a promise, it "suspends" the component until
 * the promise resolves, showing the nearest <Suspense> fallback.
 * This replaces the common useEffect-fetch-setState pattern with
 * something much simpler.
 *
 * ⚠️ FOOT-GUN: The promise passed to use() must be created OUTSIDE
 * the component render (or cached / memoised). If you create the
 * promise inline during render, React will see a brand-new promise
 * on every render attempt and re-suspend infinitely.
 *
 * Document Metadata — React 19 supports rendering <title>, <meta>,
 * and <link> tags inside components. React hoists them to <head>.
 */
import { use, Suspense, useState, useTransition } from 'react';
import ThemeContext from '../context/ThemeContext';
import useWindowSize from '../hooks/useWindowSize';

// ── Fake fetch for use(promise) demo ────────────────────────────
// Simulates a network request that resolves after a delay.
//
// ⚠️ FOOT-GUN: This promise is created once (at module scope) so
// that use() receives the SAME reference across re-renders. If you
// did `use(fetchQuote())` inline, React would create a new promise
// on each render attempt → infinite suspend loop.
interface Quote {
  text: string;
  author: string;
}

function fetchQuote(): Promise<Quote> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          text: 'The best way to predict the future is to implement it.',
          author: 'David Heinemeier Hansson',
        }),
      1500
    )
  );
}

// Cache the promise at module level so it is stable across renders.
// In real apps you'd use a data-fetching library (TanStack Query,
// Next.js cache, etc.) that handles caching for you.
let quotePromiseCache: Promise<Quote> | null = null;

function getQuotePromise(): Promise<Quote> {
  if (!quotePromiseCache) {
    quotePromiseCache = fetchQuote();
  }
  return quotePromiseCache;
}

// ── Inner component that suspends via use(promise) ──────────────
function QuoteCard() {
  // 🆕 use(promise): suspends this component until the promise
  // resolves. The nearest <Suspense> shows its fallback while
  // we wait. No useEffect, no loading state, no setState.
  const quote = use(getQuotePromise());

  return (
    <blockquote
      style={{
        margin: 0,
        padding: '12px 16px',
        borderLeft: '3px solid var(--primary)',
        background: 'var(--surface)',
        borderRadius: '0 8px 8px 0',
        fontSize: '0.9rem',
      }}
    >
      <p style={{ margin: 0, fontStyle: 'italic' }}>"{quote.text}"</p>
      <footer
        style={{
          marginTop: 6,
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
        }}
      >
        — {quote.author}
      </footer>
    </blockquote>
  );
}

export default function Settings() {
  // 🆕 use(): reads context — works identically to useContext here,
  // but unlike useContext, use() CAN be called conditionally!
  const themeCtx = use(ThemeContext);
  if (!themeCtx) {
    throw new Error('Settings must be used within a ThemeProvider');
  }
  const { theme, toggleTheme } = themeCtx;
  const { width, height } = useWindowSize();

  // Allow refetching the quote to re-demonstrate Suspense
  const [, startTransition] = useTransition();
  const [quoteKey, setQuoteKey] = useState(0);

  const handleRefetch = () => {
    // Clear the cache so a new promise is created
    quotePromiseCache = null;
    // Wrap in startTransition so the old UI stays visible while
    // the new data loads (instead of flashing the fallback).
    startTransition(() => {
      setQuoteKey((k) => k + 1);
    });
  };

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
          use(Context) Demo
          <span className="feature-tag">React 19</span>
        </label>
        <p>
          The theme value above was read with <code>use(ThemeContext)</code>{' '}
          instead of <code>useContext(ThemeContext)</code>. Unlike useContext,
          the <code>use()</code> hook can be called inside conditionals, loops,
          and after early returns.
        </p>
      </div>

      {/* 🆕 use(promise) + Suspense demo */}
      <div className="settings-group">
        <label>
          use(Promise) + Suspense Demo
          <span className="feature-tag">React 19</span>
        </label>
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginBottom: 10,
          }}
        >
          <code>use(promise)</code> suspends the component until the promise
          resolves. The nearest <code>{'<Suspense>'}</code> fallback is shown
          while loading. No <code>useEffect</code>, no loading state management
          — just <code>const data = use(promise)</code>.
        </p>

        <Suspense
          fallback={
            <div
              className="render-log"
              style={{ textAlign: 'center', padding: 16 }}
            >
              ⏳ Fetching quote…
            </div>
          }
        >
          <QuoteCard key={quoteKey} />
        </Suspense>

        <button
          className="btn btn-secondary"
          onClick={handleRefetch}
          style={{ marginTop: 8, fontSize: '0.8rem' }}
        >
          🔄 Refetch (re-suspends)
        </button>
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
