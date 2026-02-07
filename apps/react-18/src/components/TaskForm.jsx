/**
 * ⚡ FEATURES: Controlled Components, useState, useCallback, useEffect
 * 🆕 REACT 18: useId — generate unique, stable IDs for form elements
 *
 * useId() generates a unique string ID that is stable across
 * server and client renders (important for SSR hydration).
 * Use it for htmlFor/id pairs, aria-describedby, etc.
 *
 * NEVER use useId for list keys — use your data's natural ID.
 */
import { useState, useCallback, useEffect, useId } from 'react';

export default function TaskForm({ onAdd, editingTask, onUpdate, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  // 🆕 useId: generates unique IDs for accessible form labelling
  const formId = useId();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

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
        {/* 🆕 useId: accessible labelling */}
        <label htmlFor={`${formId}-title`} className="sr-only">
          Task title
        </label>
        <input
          id={`${formId}-title`}
          className="form-input"
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor={`${formId}-priority`} className="sr-only">
          Priority
        </label>
        <select
          id={`${formId}-priority`}
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
        <label htmlFor={`${formId}-desc`} className="sr-only">
          Description
        </label>
        <textarea
          id={`${formId}-desc`}
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
