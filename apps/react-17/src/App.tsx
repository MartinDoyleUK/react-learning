/**
 * ⚡ REACT 17 — Feature Explorer App
 *
 * This application demonstrates every important React 17 concept:
 *
 *  1.  New JSX Transform      — no `import React` in JSX files
 *  2.  useState               — local component state
 *  3.  useEffect              — side effects (document title, keyboard shortcut)
 *  4.  useReducer             — complex state management (tasks CRUD)
 *  5.  useContext             — theme via ThemeProvider / useTheme
 *  6.  useMemo               — derived data (filtered tasks, stats)
 *  7.  useCallback            — stable function references for children
 *  8.  useRef                 — DOM reference (focus search bar)
 *  9.  useLayoutEffect        — synchronous post-DOM-update work
 * 10.  React.memo             — skip re-renders (TaskItem, TaskStats)
 * 11.  Custom Hooks           — useDebounce, useLocalStorage (defined in hooks/)
 * 12.  Context API            — ThemeContext + useTheme
 * 13.  Error Boundaries       — class component (ErrorBoundary)
 * 14.  Portals                — Modal rendered into #modal-root
 * 15.  React.lazy + Suspense  — code-split Settings page
 * 16.  Controlled Components  — TaskForm inputs
 * 17.  forwardRef             — SearchBar exposes its input ref
 * 18.  Fragments              — <> … </> grouping without extra DOM
 * 19.  key prop               — stable keys in task list
 * 20.  Event delegation       — events on root container (React 17 change)
 * 21.  useEffect cleanup      — runs before next effect; effects run after paint
 * 22.  useImperativeHandle    — custom ref API (FancyInput)
 * 23.  useDebugValue          — DevTools labels in custom hooks
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
import ImperativeHandleDemo from './components/ImperativeHandleDemo';
import type {
  Task,
  TaskFormData,
  TaskActionPayload,
  TaskPriority,
} from './types';

// ⚡ React.lazy: code-split the Settings page into a separate chunk
const Settings = lazy(() => import('./pages/Settings'));

export default function App() {
  // ── useReducer: manage task CRUD with a reducer ──────────────
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  // ── useState: UI state ───────────────────────────────────────
  const [activeTab, setActiveTab] = useState<'tasks' | 'settings'>('tasks');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>(
    'all'
  );
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  // ── useRef: reference to the search input (via forwardRef) ───
  const searchBarRef = useRef<HTMLInputElement>(null);

  // ── Custom Hook: debounce the search input ───────────────────
  const debouncedSearch = useDebounce(searchTerm, 300);

  // ── useEffect: update document title with task count ─────────
  useEffect(() => {
    const pending = tasks.filter((t) => !t.completed).length;
    document.title = `TaskFlow (${pending} pending)`;
  }, [tasks]);

  // ── useMemo: filter tasks only when inputs change ────────────
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      const matchesPriority =
        filterPriority === 'all' || task.priority === filterPriority;
      return matchesSearch && matchesPriority;
    });
  }, [tasks, debouncedSearch, filterPriority]);

  // ── useCallback: stable handlers passed to memoised children ─
  const handleAddTask = useCallback(
    (task: TaskFormData) => dispatch({ type: 'ADD_TASK', payload: task }),
    []
  );

  const handleToggleTask = useCallback(
    (id: number) => dispatch({ type: 'TOGGLE_TASK', payload: id }),
    []
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

  // Focus the search bar with a keyboard shortcut
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
    // ⚡ Context: ThemeProvider wraps the entire app
    <ThemeProvider>
      <div className="app">
        <div className="version-banner">React 17 — Core Features</div>

        {/* Header with theme toggle (uses useContext) */}
        <Header />

        {/* ⚡ Tab navigation (simple state-driven routing) */}
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            📋 Tasks
          </button>
          <button
            className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
        </nav>

        {/* ⚡ Error Boundary: catches render errors in children */}
        <ErrorBoundary>
          {activeTab === 'tasks' ? (
            <>
              {/* Timer: demonstrates useEffect cleanup timing */}
              <Timer />

              {/* Stats: useMemo + React.memo */}
              <TaskStats tasks={tasks} />

              {/* Search: forwardRef + useDebounce */}
              <SearchBar
                ref={searchBarRef}
                value={searchTerm}
                onChange={setSearchTerm}
                filterPriority={filterPriority}
                onFilterChange={setFilterPriority}
              />

              {/* Form: controlled components */}
              <TaskForm
                onAdd={handleAddTask}
                editingTask={editingTask}
                onUpdate={handleUpdateTask}
                onCancelEdit={handleCancelEdit}
              />

              {/* List: key prop, React.memo items, useLayoutEffect */}
              <TaskList
                tasks={filteredTasks}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />

              {/* useImperativeHandle: custom ref API */}
              <ImperativeHandleDemo />

              {/* Demo: trigger error boundary */}
              <div style={{ marginTop: 24 }}>
                <BuggyComponent />
              </div>

              {/* ⚡ Portal: Modal renders into #modal-root */}
              <Modal
                isOpen={deleteTarget !== null}
                title="Delete Task?"
                message="This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
              />
            </>
          ) : (
            // ⚡ Suspense: shows fallback while lazy component loads
            <Suspense fallback={<div className="loading">Loading settings…</div>}>
              <Settings />
            </Suspense>
          )}
        </ErrorBoundary>
      </div>
    </ThemeProvider>
  );
}

