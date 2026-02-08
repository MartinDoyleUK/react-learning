/**
 * ⚡ FEATURES: React.memo, Fragments, key prop
 *
 * React.memo   — wraps this component so React skips re-rendering it
 *                when its props haven't changed (shallow comparison).
 * Fragments    — <> … </> groups elements without adding extra DOM nodes.
 * key prop     — provided by the parent list for efficient reconciliation.
 */
import { memo } from 'react';
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  return (
    <div
      className={`task-item ${task.completed ? 'completed' : ''}`}
    >
      <input
        className="task-checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${
          task.completed ? 'incomplete' : 'complete'
        }`}
      />

      <div className="task-content">
        <div className="task-title">{task.title}</div>
        {task.description && (
          <div className="task-description">{task.description}</div>
        )}
        <div className="task-meta">
          <>
            <span className={`priority-badge priority-${task.priority}`}>
              {task.priority}
            </span>
            <span className="task-date">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="btn-icon"
          onClick={() => onEdit(task)}
          title="Edit"
          aria-label={`Edit "${task.title}"`}
        >
          ✏️
        </button>
        <button
          className="btn-icon"
          onClick={() => onDelete(task.id)}
          title="Delete"
          aria-label={`Delete "${task.title}"`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default memo(TaskItem);
