/**
 * ⚡ FEATURES: React.memo, Fragments, key prop
 * 🆕 REACT 19: Supports optimistic styling
 *
 * The `sending` prop (from useOptimistic in App.jsx) adds a
 * visual indicator when the toggle is optimistically applied
 * but hasn't been confirmed yet.
 */
import { memo } from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  // 🆕 React 19: the task may have a `sending` flag from useOptimistic
  const isOptimistic = task.sending;

  return (
    <div
      className={`task-item ${task.completed ? 'completed' : ''} ${
        isOptimistic ? 'optimistic' : ''
      }`}
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
        <div className="task-title">
          {task.title}
          {isOptimistic && (
            <span className="feature-tag" style={{ marginLeft: 8 }}>
              optimistic
            </span>
          )}
        </div>
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

export default memo(TaskItem);
