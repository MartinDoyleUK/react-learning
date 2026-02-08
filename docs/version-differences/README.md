# Version Differences Guide

Understanding the differences between React versions helps you:
- Decide when to upgrade
- Write version-appropriate code
- Migrate projects smoothly
- Understand React's evolution

## Quick Version Comparison

| Feature | React 17 | React 18 | React 19 |
|---------|----------|----------|----------|
| **Root API** | `ReactDOM.render()` | `createRoot()` | `createRoot()` |
| **Batching** | Event handlers only | Everywhere | Everywhere |
| **Concurrent** | ❌ | ✅ | ✅ |
| **Transitions** | ❌ | `useTransition` | `useTransition` |
| **Deferred Values** | ❌ | `useDeferredValue` | `useDeferredValue` |
| **Form Actions** | Manual | Manual | `useActionState` ✅ |
| **Optimistic UI** | Manual | Manual | `useOptimistic` ✅ |
| **forwardRef** | Required | Required | Optional ✅ |
| **Document Metadata** | Library | Library | Native ✅ |
| **Ref Cleanup** | Manual | Manual | Return function ✅ |

## Migration Paths

### React 17 → 18

**Difficulty:** ⭐️⭐️ (Easy to Medium)

**Time Estimate:** 1-2 days for medium app

**Key Changes:**
1. Update root API (`createRoot`)
2. Fix effect cleanup functions
3. Test automatic batching behavior
4. Optionally add concurrent features

**Read:** [React 17 vs 18 Guide](./17-vs-18.md)

---

### React 18 → 19

**Difficulty:** ⭐️ (Easy)

**Time Estimate:** 1 day for medium app

**Key Changes:**
1. Remove `forwardRef` where not needed
2. Replace form handling with Actions
3. Replace react-helmet with native metadata
4. Update Context syntax (optional)

**Read:** [React 18 vs 19 Guide](./18-vs-19.md)

---

### React 17 → 19

**Difficulty:** ⭐️⭐️⭐️ (Medium)

**Time Estimate:** 2-4 days for medium app

**Recommended:** Upgrade 17 → 18 first, then 18 → 19

**Why?**
- Easier to isolate issues
- Better understanding of changes
- More gradual learning curve

---

## Feature Timeline

```
React 17 (Oct 2020)
├─ New JSX Transform
├─ Event Delegation Changes
└─ Core Hooks (useState, useEffect, etc.)

React 18 (Mar 2022)
├─ createRoot API
├─ Automatic Batching
├─ useTransition
├─ useDeferredValue
├─ useId
├─ useSyncExternalStore
└─ Suspense Improvements

React 19 (Dec 2024)
├─ Actions (useActionState, useFormStatus)
├─ useOptimistic
├─ use() hook
├─ ref as prop
├─ Ref cleanup functions
├─ Context without .Provider
├─ Document metadata
└─ Asset loading APIs
```

## Detailed Guides

### [React 17 vs React 18](./17-vs-18.md)
Learn about:
- Concurrent rendering
- Automatic batching
- New hooks (useTransition, useDeferredValue, useId)
- Strict Mode changes
- Migration strategies

### [React 18 vs React 19](./18-vs-19.md)
Learn about:
- Actions and form handling
- Optimistic UI
- Simplified ref handling
- Native document metadata
- Removed deprecated APIs

## Upgrade Decision Matrix

| Your Situation | Recommended Version |
|----------------|-------------------|
| New project in 2025+ | React 19 ✅ |
| Existing stable app | Stay on current version |
| App with performance issues | Upgrade to React 18 |
| Heavy form usage | Consider React 19 |
| Legacy code (class components) | React 17 or 18 |
| Using latest framework (Next.js 15+) | React 19 |

## Common Upgrade Blockers

### Dependencies Not Ready
```bash
# Check if your dependencies support React 19
npm ls react

# Look for peer dependency warnings
npm install
```

**Solution:** Wait for library updates or find alternatives

### Breaking Changes
- String refs (removed in 19)
- Legacy context (removed in 19)
- Module pattern components (removed in 19)

**Solution:** Refactor before upgrading

### Test Coverage
**Problem:** Hard to verify behavior without tests

**Solution:** Add tests before upgrading

## Testing Upgrade Strategies

### 1. Parallel Installation
Run old and new versions side-by-side:
```bash
# Doesn't work - can't have two React versions
❌ npm install react@18 react-19@npm:react@19
```

### 2. Feature Branch
```bash
git checkout -b upgrade-react-19
npm install react@19 react-dom@19
npm test
# Test thoroughly before merging
```

### 3. Incremental Adoption (Micro-frontends)
Upgrade one part of your app at a time.

## Version Support Policy

| Version | Released | Status | Support Until |
|---------|----------|--------|---------------|
| React 19 | Dec 2024 | ✅ Current | TBD |
| React 18 | Mar 2022 | ✅ Maintained | TBD |
| React 17 | Oct 2020 | ⚠️ Legacy | Ended |
| React 16 | Sep 2017 | ❌ Unsupported | Ended |

**Maintenance mode** = Security fixes only, no new features

## Additional Resources

- [Official React Blog](https://react.dev/blog)
- [React RFCs](https://github.com/reactjs/rfcs)
- [React 18 Working Group](https://github.com/reactwg/react-18)
- [React 18 Upgrade Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)

---

**Need help deciding?** Check the [Getting Started Guide](../getting-started.md) or explore the [example apps](../../apps/).

