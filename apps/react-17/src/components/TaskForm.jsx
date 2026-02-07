/**
 * ⚡ FEATURES: Controlled Components, useState, useCallback, useEffect
 *
 * Every form input is "controlled" — its value is driven by React
 * state and updated via onChange handlers. This is the standard
 * pattern in React for forms.
 *
 * useCallback wraps the submit handler so the function identity
 * remains stable across renders (important when passed as props
 * to memoised children).
 */
import { useState, useCallback, useEffect } from 'react';

export default function TaskForm({ onAdd, editingTask, onUpdate, onCancelEdit }) {
  // Controlled form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  // Populate form when editing an existing task
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  // useCallback: stable function reference for the submit handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!title.trim()) return;

      if (editingTask) {
        onUpdate({
          id: editingTask.id,
          updates: { title: title.trim(), description: description.trim(), priority },
        });
      } else {
        onAdd({ title: title.trim(), description: description.trim(), priority });
      }

      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
    },
    [title, description, priority, editingTask, onAdd, onUpdate]
  );

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{editingTask ? '✏️ Edit Task' : '➕ New Task'}</h3>

      <div className="form-row">
        {/* Controlled input — value driven by state */}
        <input
          className="form-input"
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select
          className="form-input"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ flex: '0 0 140px' }}
        >
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
      </div>

      <div className="form-row">
        <textarea
          className="form-input"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-row">
        <button type="submit" className="btn btn-primary">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              onCancelEdit();
              setTitle('');
              setDescription('');
              setPriority('medium');
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

