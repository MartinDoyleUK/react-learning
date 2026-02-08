# Getting Started

This guide will help you set up and run the React Learning Project on your machine.

## Prerequisites

### Required
- **Node.js** 18.0.0 or higher
  - Check: `node --version`
  - Download: https://nodejs.org/
- **pnpm** 10.0.0 or higher
  - Check: `pnpm --version`
  - Install: `npm install -g pnpm`

### Recommended
- **VS Code** with extensions:
  - ESLint
  - Prettier
  - React DevTools (browser extension)
- **Modern browser** with React DevTools

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd react-learning
```

### 2. Install Dependencies

```bash
pnpm install
```

This installs dependencies for all three apps using pnpm workspaces.

### 3. Verify Installation

```bash
# Check that all packages are installed
pnpm list --depth=0
```

You should see:
- `react@17.0.2` in `apps/react-17`
- `react@18.3.1` in `apps/react-18`
- `react@^19.0.0` in `apps/react-19`

## Running the Apps

### Option 1: Run All Apps Simultaneously

```bash
pnpm dev
```

This starts all three apps:
- React 17: http://localhost:5170
- React 18: http://localhost:5180
- React 19: http://localhost:5190

### Option 2: Run Individual Apps

```bash
# React 17 only
pnpm dev:17

# React 18 only
pnpm dev:18

# React 19 only
pnpm dev:19
```

### Option 3: Navigate to Specific App

```bash
cd apps/react-17
pnpm dev
```

## Building for Production

### Build All Apps

```bash
pnpm build
```

### Build Individual Apps

```bash
pnpm build:17
pnpm build:18
pnpm build:19
```

Build output will be in `apps/react-{version}/dist/`

## Project Structure

```
react-learning/
├── apps/
│   ├── react-17/               # React 17 app
│   │   ├── src/
│   │   │   ├── components/     # UI components
│   │   │   ├── context/        # Context providers
│   │   │   ├── hooks/          # Custom hooks
│   │   │   ├── pages/          # Lazy-loaded pages
│   │   │   ├── reducers/       # Reducer logic
│   │   │   ├── App.tsx         # Main app component
│   │   │   ├── main.tsx        # Entry point
│   │   │   └── index.css       # Global styles
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── react-18/               # React 18 app (similar structure)
│   └── react-19/               # React 19 app (similar structure)
├── docs/                       # Documentation
├── package.json                # Root workspace config
├── pnpm-workspace.yaml         # Workspace definition
└── turbo.json                  # Turborepo config
```

## Exploring the Code

### 1. Start with React 17

Open `apps/react-17/src/App.tsx` - this is the main entry point with detailed comments explaining every feature.

### 2. Compare Versions

Open the same file in all three versions side-by-side to see how features differ:
- `apps/react-17/src/App.tsx`
- `apps/react-18/src/App.tsx`
- `apps/react-19/src/App.tsx`

### 3. Follow the Comments

Every file has extensive comments marked with:
- `⚡ FEATURE:` - Core React features
- `🆕 NEW:` - Version-specific additions
- `📝 NOTE:` - Important details

### 4. Use React DevTools

Install React DevTools for your browser:
- Chrome: [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- Firefox: [React DevTools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

## Common Tasks

### Inspect Component Rendering

1. Open React DevTools in your browser
2. Go to the "Profiler" tab
3. Click "Start Profiling"
4. Interact with the app
5. Click "Stop Profiling" to see render times

### Debug State Changes

1. Open React DevTools
2. Go to "Components" tab
3. Select a component
4. View props, state, and hooks on the right panel
5. Edit values to test different scenarios

### Check for Re-renders

```jsx
// Add this to any component
console.count('ComponentName rendered');
```

Or use the "Highlight updates" option in React DevTools settings.

## Troubleshooting

### Port Already in Use

If you get an error like "Port 5170 is already in use":

```bash
# Find and kill the process
lsof -ti:5170 | xargs kill -9

# Or use a different port
cd apps/react-17
pnpm dev -- --port 5171
```

### Dependencies Not Installing

```bash
# Clear cache and reinstall
rm -rf node_modules apps/*/node_modules
pnpm store prune
pnpm install
```

### React Version Conflicts

Each app should use its own React version. Verify with:

```bash
cd apps/react-17 && pnpm list react
cd ../react-18 && pnpm list react
cd ../react-19 && pnpm list react
```

### Hot Reload Not Working

1. Check Vite is running (terminal should show "ready in X ms")
2. Refresh the browser
3. Check browser console for errors
4. Restart the dev server

### Build Errors

```bash
# Clean build artifacts
rm -rf apps/*/dist

# Rebuild
pnpm build
```

## Learning Path

### Week 1: React 17 Fundamentals
- [ ] Run the React 17 app
- [ ] Understand useState and useEffect
- [ ] Learn useReducer for complex state
- [ ] Master useContext and custom hooks
- [ ] Study React.memo and performance optimization

### Week 2: React 18 Concurrent Features
- [ ] Compare React 17 vs 18 implementations
- [ ] Learn about automatic batching
- [ ] Understand useTransition for non-blocking updates
- [ ] Study useDeferredValue for prioritizing renders
- [ ] Explore useSyncExternalStore

### Week 3: React 19 Modern Patterns
- [ ] Compare React 18 vs 19 implementations
- [ ] Learn the Actions pattern
- [ ] Master form handling with useActionState
- [ ] Implement optimistic UI with useOptimistic
- [ ] Explore ref improvements and document metadata

### Week 4: Build Your Own
- [ ] Create a new feature in each app
- [ ] Implement the same feature differently per version
- [ ] Write tests for your components
- [ ] Deploy to production

## Next Steps

- Explore [Version Differences](./version-differences/) — migration guides between React 17, 18 & 19
- Read the source code — every file has detailed comments explaining features
- Build something with what you've learned!

## Getting Help

- **Documentation**: Check the [docs folder](./README.md)
- **Code Comments**: Every file has detailed explanations
- **React Docs**: https://react.dev
- **Issues**: Open an issue on GitHub

---

Ready to start? Open the React 17 app and explore `src/App.tsx`!

