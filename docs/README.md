# React Learning Project Documentation

Welcome to the comprehensive React learning project! This monorepo contains three separate applications demonstrating React 17, 18, and 19 features side-by-side.

## 🎯 Project Overview

This project is designed to teach React's evolution by providing working examples of:
- **React 17** - Foundation with all core hooks and patterns
- **React 18** - Concurrent features, automatic batching, and transitions
- **React 19** - Actions, optimistic UI, and modern patterns

Each version is a **fully functional task manager** application that demonstrates version-specific features while building on concepts from previous versions.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (for React 19 support)
- pnpm 8+

### Installation

```bash
# Install dependencies for all apps
pnpm install

# Run all apps simultaneously
pnpm dev

# Or run specific versions:
pnpm dev:17  # React 17 on http://localhost:5170
pnpm dev:18  # React 18 on http://localhost:5180
pnpm dev:19  # React 19 on http://localhost:5190
```

### Build

```bash
# Build all apps
pnpm build

# Or build specific versions:
pnpm build:17
pnpm build:18
pnpm build:19
```

## 📚 Learning Path

### Beginners - Start Here
1. **React 17 App** (`apps/react-17/`) - Learn core concepts
   - Hooks Basics — useState, useEffect, useContext (see `src/App.jsx`)
   - Component Patterns — Props, composition, lifting state
   - Custom Hooks — Reusable logic (see `src/hooks/`)

### Intermediate - Level Up
2. **React 18 App** (`apps/react-18/`) - Concurrent features
   - Automatic Batching (see `src/components/AutoBatchingDemo.jsx`)
   - useTransition & useDeferredValue (see `src/App.jsx`)
   - useSyncExternalStore (see `src/hooks/useWindowSize.js`)
   - [React 17 vs 18 Guide](./version-differences/17-vs-18.md)

### Advanced - Master Modern React
3. **React 19 App** (`apps/react-19/`) - Latest features
   - Actions Pattern (see `src/components/TaskForm.jsx`)
   - useActionState & useFormStatus (see `src/components/SubmitButton.jsx`)
   - useOptimistic (see `src/App.jsx`)
   - Document Metadata (see `src/pages/Settings.jsx`)
   - [React 18 vs 19 Guide](./version-differences/18-vs-19.md)

## 📖 Documentation Structure

```
docs/
├── README.md                          # You are here
├── getting-started.md                 # Detailed setup & troubleshooting
│
└── version-differences/               # Migration guides
    ├── README.md
    ├── 17-vs-18.md
    └── 18-vs-19.md
```

## 🎓 What You'll Learn

### React 17 - Foundation (20+ Features)
- ✅ All core hooks (useState, useEffect, useContext, useReducer, etc.)
- ✅ Component patterns (composition, children, render props)
- ✅ Performance optimization (React.memo, useMemo, useCallback)
- ✅ Error Boundaries
- ✅ Portals
- ✅ Code splitting with React.lazy + Suspense
- ✅ forwardRef
- ✅ Custom hooks

### React 18 - Concurrent Features (7 New Features)
- 🆕 createRoot API
- 🆕 Automatic batching everywhere
- 🆕 useTransition
- 🆕 useDeferredValue
- 🆕 useId
- 🆕 useSyncExternalStore
- 🆕 Strict Mode improvements

### React 19 - Modern React (8+ New Features)
- 🆕 Actions pattern
- 🆕 useActionState (form handling)
- 🆕 useFormStatus
- 🆕 useOptimistic
- 🆕 use() hook
- 🆕 ref as a prop (no forwardRef needed)
- 🆕 Context without .Provider
- 🆕 Document metadata support
- 🆕 Ref cleanup functions

## 🔍 Feature Comparison

| Feature | React 17 | React 18 | React 19 |
|---------|----------|----------|----------|
| Core Hooks | ✅ | ✅ | ✅ |
| Automatic Batching | Event handlers only | ✅ Everywhere | ✅ Everywhere |
| Concurrent Rendering | ❌ | ✅ | ✅ |
| Transitions | ❌ | ✅ | ✅ |
| Actions | ❌ | ❌ | ✅ |
| Optimistic UI | Manual | Manual | ✅ Built-in |
| forwardRef Required | ✅ | ✅ | ❌ Optional |
| Document Metadata | ❌ | ❌ | ✅ |

## 🎯 Learning Goals

By completing this project, you will:

1. **Understand React's Evolution** - See how React has improved over major versions
2. **Master Core Concepts** - Deep understanding of hooks, context, and patterns
3. **Learn Performance** - When and how to optimize React applications
4. **Adopt Modern Patterns** - Use the latest React 19 features effectively
5. **Build Real Apps** - Apply concepts in a practical task manager

## 🏃 Next Steps

1. **Explore the Apps** - Run each version and compare the implementations
2. **Read the Code** - Each file has detailed comments explaining features
3. **Study the Docs** - Deep dive into specific features you want to learn
4. **Build Your Own** - Use this as a template for your projects
5. **Contribute** - Found a bug or want to add a feature? PRs welcome!

## 📝 Notes

- **Version-Specific Code**: Each app uses only APIs available in its React version
- **Progressive Enhancement**: Concepts build from React 17 → 18 → 19
- **Production Ready**: All patterns are production-quality, not toy examples
- **Comments Everywhere**: Learn by reading - every feature is explained

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## 📄 License

MIT - see [LICENSE](../LICENSE) for details.

---

**Happy Learning! 🚀**

Start with the [Getting Started Guide](./getting-started.md) or dive into the [React 17 App](../apps/react-17/) to begin your journey.

