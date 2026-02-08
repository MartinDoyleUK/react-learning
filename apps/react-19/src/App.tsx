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
import RefCleanupDemo from './components/RefCleanupDemo';
import type { Task, TaskFormData, TaskActionPayload, TaskPriority } from './types';

const Settings = lazy(() => import('./pages/Settings'));

export default function App() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [activeTab, setActiveTab] = useState<'tasks' | 'settings'>('tasks');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>(
    'all'
  );
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);

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
    (currentTasks: Task[], toggledId: number): Task[] =>
      currentTasks.map((task) =>
        task.id === toggledId
          ? { ...task, completed: !task.completed, sending: true }
          : task
      )
  );

  const handleTabChange = useCallback(
    (tab: 'tasks' | 'settings') => {
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

  // ⚠️ FOOT-GUN: The empty dependency array [] is safe here because
  // `dispatch` from useReducer is guaranteed to be a stable reference
  // (it never changes between renders). If this callback closed over
  // a state variable instead, [] would create a stale closure that
  // forever sees the initial value. Always list every variable your
  // callback reads — except for known-stable refs like dispatch, refs,
  // and setState functions.
  const handleAddTask = useCallback(
    (task: TaskFormData) => dispatch({ type: 'ADD_TASK', payload: task }),
    []
  );

  // 🆕 useOptimistic: toggle with optimistic update + simulated delay
  const handleToggleTask = useCallback(
    async (id: number) => {
      // Show the toggle immediately (optimistic)
      addOptimistic(id);

      // Simulate a server round-trip
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Apply the real update — optimistic state merges back
      dispatch({ type: 'TOGGLE_TASK', payload: id });
    },
    [addOptimistic]
  );

  const handleDeleteTask = useCallback((id: number) => {
    setDeleteTarget(id);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteTarget !== null) {
      dispatch({ type: 'DELETE_TASK', payload: deleteTarget });
      setDeleteTarget(null);
    }
  }, [deleteTarget]);

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
  }, []);

  const handleUpdateTask = useCallback((payload: TaskActionPayload) => {
    dispatch({ type: 'EDIT_TASK', payload });
    setEditingTask(null);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingTask(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

              {/* 🆕 ref cleanup functions: ref callbacks return a cleanup */}
              <RefCleanupDemo />

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

