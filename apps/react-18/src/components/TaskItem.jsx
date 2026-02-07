/**
 * ⚡ FEATURES: React.memo, useCallback (consumed), Fragments, key prop
 *
 * React.memo  — wraps this component so it only re-renders when its
 *               props actually change (shallow comparison).
 * Fragments   — the task-meta section uses <></> (short syntax for
 *               React.Fragment) to group elements without extra DOM.
 * key prop    — the parent (TaskList) provides a unique `key` to each
 *               TaskItem so React can efficiently reconcile the list.
 */
import { memo } from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {/* Controlled checkbox */}
      <input
        className="task-checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />

      <div className="task-content">
        <div className="task-title">{task.title}</div>
        {task.description && (
          <div className="task-description">{task.description}</div>
        )}
        <div className="task-meta">
          {/* Fragment (<>…</>) groups these without extra DOM nodes */}
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
        >
          ✏️
        </button>
        <button
          className="btn-icon"
          onClick={() => onDelete(task.id)}
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

// React.memo: prevents re-render unless props change
export default memo(TaskItem);

