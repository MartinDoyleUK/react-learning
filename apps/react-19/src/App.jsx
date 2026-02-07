/**
 * ⚡ REACT 19 — Feature Explorer App
 *
 * Everything from React 17 & 18, PLUS these new features:
 *
 *  🆕 1.  useActionState        — form actions (see TaskForm)
 *  🆕 2.  useFormStatus         — pending state in SubmitButton
 *  🆕 3.  useOptimistic         — instant optimistic UI updates
 *  🆕 4.  use()                 — read context & promises (see Settings)
 *  🆕 5.  ref as a prop         — no forwardRef needed (see SearchBar)
 *  🆕 6.  <Context> provider    — no .Provider wrapper (see ThemeContext)
 *  🆕 7.  Document metadata     — <title>, <meta> in components (see Settings)
 *  🆕 8.  ref cleanup functions — ref callbacks return cleanup
 *  🆕 9.  Asset loading         — <link>, <script async> dedup (see Settings)
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
  useTransition,
  useDeferredValue,
  // 🆕 React 19
  useOptimistic,
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

  const debouncedSearch = useDebounce(searchTerm, 300);
  const [isPending, startTransition] = useTransition();
  const deferredSearch = useDeferredValue(debouncedSearch);
  const isStale = deferredSearch !== debouncedSearch;

  // 🆕 useOptimistic: show task toggles immediately while the
  //    "server" operation is in progress. If it fails, the UI
  //    automatically reverts to the real state.
  //
  //    Signature: useOptimistic(actualState, applyOptimisticUpdate)
  //    Returns: [optimisticState, addOptimistic]
  const [optimisticTasks, addOptimistic] = useOptimistic(
    tasks,
    (currentTasks, toggledId) =>
      currentTasks.map((task) =>
        task.id === toggledId
          ? { ...task, completed: !task.completed, sending: true }
          : task
      )
  );

  const handleTabChange = useCallback(
    (tab) => {
      startTransition(() => setActiveTab(tab));
    },
    [startTransition]
  );

  useEffect(() => {
    const pending = tasks.filter((t) => !t.completed).length;
    document.title = `TaskFlow (${pending} pending)`;
  }, [tasks]);

  // Use optimisticTasks (not raw tasks) for filtering
  const filteredTasks = useMemo(() => {
    return optimisticTasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(deferredSearch.toLowerCase());
      const matchesPriority =
        filterPriority === 'all' || task.priority === filterPriority;
      return matchesSearch && matchesPriority;
    });
  }, [optimisticTasks, deferredSearch, filterPriority]);

  const handleAddTask = useCallback(
    (task) => dispatch({ type: 'ADD_TASK', payload: task }),
    []
  );

  // 🆕 useOptimistic: toggle with optimistic update + simulated delay
  const handleToggleTask = useCallback(
    async (id) => {
      // Show the toggle immediately (optimistic)
      addOptimistic(id);

      // Simulate a server round-trip
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Apply the real update — optimistic state merges back
      dispatch({ type: 'TOGGLE_TASK', payload: id });
    },
    [addOptimistic]
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

  // 🆕 ref cleanup function: the callback ref returns a cleanup
  //    function that runs when the ref is detached. This replaces
  //    the old pattern of setting ref to null.
  const logRef = useCallback((node) => {
    if (node) {
      console.log('[ref cleanup demo] Search bar mounted:', node.tagName);
    }
    // 🆕 React 19: return a cleanup function
    return () => {
      console.log('[ref cleanup demo] Search bar unmounted');
    };
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
          React 19 — Actions, Optimistic UI & More
        </div>

        <Header />

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
              <AutoBatchingDemo />

              <Timer />

              <TaskStats tasks={optimisticTasks} />

              {/* 🆕 ref as prop: no forwardRef needed in React 19 */}
              <SearchBar
                ref={searchBarRef}
                value={searchTerm}
                onChange={setSearchTerm}
                filterPriority={filterPriority}
                onFilterChange={setFilterPriority}
              />

              {/* 🆕 TaskForm uses useActionState + useFormStatus */}
              <TaskForm
                onAdd={handleAddTask}
                editingTask={editingTask}
                onUpdate={handleUpdateTask}
                onCancelEdit={handleCancelEdit}
              />

              <div className={isStale ? 'pending-indicator' : ''}>
                <TaskList
                  tasks={filteredTasks}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              </div>

              {/* flushSync: opt out of batching (React 18+) */}
              <FlushSyncDemo />

              {/* useInsertionEffect: CSS-in-JS style injection timing (React 18+) */}
              <UseInsertionEffectDemo />

              {/* useImperativeHandle: custom ref API (no forwardRef in React 19!) */}
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
              {/* 🆕 Settings uses use() hook and <title> metadata */}
              <Settings />
            </Suspense>
          )}
        </ErrorBoundary>
      </div>
    </ThemeProvider>
  );
}
