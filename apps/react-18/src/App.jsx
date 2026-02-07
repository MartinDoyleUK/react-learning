/**
 * ⚡ REACT 18 — Feature Explorer App
 *
 * Everything from React 17, PLUS these new features:
 *
 *  🆕 1.  createRoot API         — concurrent root (see main.jsx)
 *  🆕 2.  Automatic Batching     — setState batched in ALL contexts
 *  🆕 3.  useTransition          — mark state updates as non-urgent
 *  🆕 4.  useDeferredValue       — defer rendering of expensive lists
 *  🆕 5.  useId                  — generate unique IDs (see TaskForm)
 *  🆕 6.  useSyncExternalStore   — subscribe to external stores
 *  🆕 7.  Strict Mode effects    — double-fire in dev to catch bugs
 *  🆕 8.  flushSync              — opt out of batching for immediate DOM updates
 *  🆕 9.  useInsertionEffect     — inject styles before DOM mutations (CSS-in-JS)
 *  10. useImperativeHandle       — custom ref API (paired with forwardRef)
 *  11. useDebugValue             — DevTools labels in custom hooks
 *
 * All React 17 features continue to work unchanged.
 */
import {
  useState,
  useReducer,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  lazy,
  Suspense,
  // 🆕 React 18 hooks
  useTransition,
  useDeferredValue,
} from 'react';
import { ThemeProvider } from './context/ThemeContext';
import taskReducer, { initialTasks } from './reducers/taskReducer';
import useDebounce from './hooks/useDebounce';
import Header from './components/Header';
import TaskStats from './components/TaskStats';
import SearchBar from './components/SearchBar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';
import ErrorBoundary from './components/ErrorBoundary';
import BuggyComponent from './components/BuggyComponent';
import Timer from './components/Timer';
import AutoBatchingDemo from './components/AutoBatchingDemo';
import FlushSyncDemo from './components/FlushSyncDemo';
import UseInsertionEffectDemo from './components/UseInsertionEffectDemo';
import ImperativeHandleDemo from './components/ImperativeHandleDemo';

const Settings = lazy(() => import('./pages/Settings'));

export default function App() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [activeTab, setActiveTab] = useState('tasks');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const searchBarRef = useRef(null);

  // ── Custom hook: debounce ────────────────────────────────────
  const debouncedSearch = useDebounce(searchTerm, 300);

  // 🆕 useTransition: mark tab switching as non-urgent so the UI
  //    stays responsive. isPending is true while the transition is
  //    in progress — we can use it to show a visual indicator.
  const [isPending, startTransition] = useTransition();

  const handleTabChange = useCallback(
    (tab) => {
      // Wrap the state update in startTransition → React keeps
      // showing the current tab until the new one is ready
      startTransition(() => {
        setActiveTab(tab);
      });
    },
    [startTransition]
  );

  // 🆕 useDeferredValue: creates a "lagging" copy of the search term.
  //    During rapid typing, React prioritises keeping the input
  //    responsive and defers re-rendering the (potentially expensive)
  //    filtered task list until the browser has idle time.
  const deferredSearch = useDeferredValue(debouncedSearch);
  const isStale = deferredSearch !== debouncedSearch;

  useEffect(() => {
    const pending = tasks.filter((t) => !t.completed).length;
    document.title = `TaskFlow (${pending} pending)`;
  }, [tasks]);

  // useMemo uses the DEFERRED search value, so the list computation
  // is deprioritised during rapid input
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(deferredSearch.toLowerCase());
      const matchesPriority =
        filterPriority === 'all' || task.priority === filterPriority;
      return matchesSearch && matchesPriority;
    });
  }, [tasks, deferredSearch, filterPriority]);

  // ── useCallback handlers (same as React 17) ─────────────────
  const handleAddTask = useCallback(
    (task) => dispatch({ type: 'ADD_TASK', payload: task }),
    []
  );

  const handleToggleTask = useCallback(
    (id) => dispatch({ type: 'TOGGLE_TASK', payload: id }),
    []
  );

  const handleDeleteTask = useCallback((id) => {
    setDeleteTarget(id);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteTarget !== null) {
      dispatch({ type: 'DELETE_TASK', payload: deleteTarget });
      setDeleteTarget(null);
    }
  }, [deleteTarget]);

  const handleEditTask = useCallback((task) => {
    setEditingTask(task);
  }, []);

  const handleUpdateTask = useCallback((payload) => {
    dispatch({ type: 'EDIT_TASK', payload });
    setEditingTask(null);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingTask(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchBarRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <div className="app">
        <div className="version-banner">
          React 18 — Concurrent Features
        </div>

        <Header />

        {/* 🆕 isPending: visual feedback during transitions */}
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => handleTabChange('tasks')}
          >
            📋 Tasks
          </button>
          <button
            className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => handleTabChange('settings')}
          >
            ⚙️ Settings {isPending && '⏳'}
          </button>
        </nav>

        <ErrorBoundary>
          {activeTab === 'tasks' ? (
            <>
              {/* 🆕 Automatic Batching demo */}
              <AutoBatchingDemo />

              <Timer />

              <TaskStats tasks={tasks} />

              <SearchBar
                ref={searchBarRef}
                value={searchTerm}
                onChange={setSearchTerm}
                filterPriority={filterPriority}
                onFilterChange={setFilterPriority}
              />

              <TaskForm
                onAdd={handleAddTask}
                editingTask={editingTask}
                onUpdate={handleUpdateTask}
                onCancelEdit={handleCancelEdit}
              />

              {/* 🆕 useDeferredValue: dim the list while it's "stale" */}
              <div className={isStale ? 'pending-indicator' : ''}>
                <TaskList
                  tasks={filteredTasks}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              </div>

              {/* 🆕 flushSync: opt out of batching */}
              <FlushSyncDemo />

              {/* 🆕 useInsertionEffect: CSS-in-JS style injection timing */}
              <UseInsertionEffectDemo />

              {/* useImperativeHandle: custom ref API */}
              <ImperativeHandleDemo />

              <div style={{ marginTop: 24 }}>
                <BuggyComponent />
              </div>

              <Modal
                isOpen={deleteTarget !== null}
                title="Delete Task?"
                message="This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
              />
            </>
          ) : (
            <Suspense fallback={<div className="loading">Loading settings…</div>}>
              <Settings />
            </Suspense>
          )}
        </ErrorBoundary>
      </div>
    </ThemeProvider>
  );
}
