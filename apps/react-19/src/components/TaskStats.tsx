/**
 * ⚡ FEATURES: useMemo, React.memo
 *
 * useMemo  — memoises the computed statistics so they're only
 *            recalculated when the tasks array actually changes.
 * React.memo — prevents this component from re-rendering unless
 *              its props change (shallow comparison by default).
 *
 * Both are key tools for performance optimisation in React.
 */
import { useMemo, memo } from 'react';
import type { Task } from '../types';

interface TaskStatsProps {
  tasks: Task[];
}

interface Stats {
  total: number;
  completed: number;
  pending: number;
  high: number;
  medium: number;
  low: number;
}

function TaskStats({ tasks }: TaskStatsProps) {
  // useMemo: expensive derivation only re-runs when `tasks` changes
  const stats = useMemo<Stats>(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const high = tasks.filter((t) => t.priority === 'high').length;
    const medium = tasks.filter((t) => t.priority === 'medium').length;
    const low = tasks.filter((t) => t.priority === 'low').length;
    return { total, completed, pending: total - completed, high, medium, low };
  }, [tasks]);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-value">{stats.total}</div>
        <div className="stat-label">Total</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{stats.completed}</div>
        <div className="stat-label">Done</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{stats.pending}</div>
        <div className="stat-label">Pending</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{stats.high}</div>
        <div className="stat-label">High</div>
      </div>
    </div>
  );
}

// React.memo: skip re-renders when `tasks` reference hasn't changed
export default memo(TaskStats);

