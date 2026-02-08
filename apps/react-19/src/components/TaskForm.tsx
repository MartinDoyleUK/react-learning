/**
 * 🆕 REACT 19 FEATURES: useActionState, form actions
 *
 * useActionState replaces the manual useState + onSubmit pattern.
 * The form's `action` prop accepts an async function that receives
 * FormData directly — no need for e.preventDefault() or manual
 * state management.
 *
 * Signature: const [state, formAction, isPending] = useActionState(fn, initialState)
 *
 * The action function receives (previousState, formData) and
 * returns the next state. React automatically manages the
 * pending state.
 *
 * Combined with useFormStatus (in SubmitButton), this gives you
 * a complete form solution with built-in loading states.
 *
 * This component also supports editing an existing task. When
 * `editingTask` is provided, the form pre-fills with the task's
 * values and switches to "update" mode.
 */
import { useActionState, useRef, useEffect } from 'react';
import SubmitButton from './SubmitButton';
import type { Task, TaskFormData, TaskActionPayload, FormState } from '../types';

interface TaskFormProps {
  onAdd: (task: TaskFormData) => void;
  editingTask: Task | null;
  onUpdate: (payload: TaskActionPayload) => void;
  onCancelEdit: () => void;
}

export default function TaskForm({
  onAdd,
  editingTask,
  onUpdate,
  onCancelEdit,
}: TaskFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  // 🆕 useActionState: manages form submission state automatically
  const [formState, formAction] = useActionState<FormState | null, FormData>(
    async (_previousState, formData) => {
      const title = formData.get('title')?.toString().trim() ?? '';
      const description = formData.get('description')?.toString().trim() ?? '';
      const priority = (formData.get('priority')?.toString() ??
        'medium') as TaskFormData['priority'];

      if (!title) {
        // Return error state — we also include the submitted values
        // so the form can be repopulated (the form auto-resets on
        // action completion, so without this the user loses input).
        return {
          error: 'Title is required',
          values: { title: '', description, priority },
        };
      }

      // Simulate async operation (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 400));

      if (editingTask) {
        onUpdate({
          id: editingTask.id,
          updates: { title, description, priority },
        });
      } else {
        onAdd({ title, description, priority });
      }

      return { success: true };
    },
    null
  );

  // Keep uncontrolled inputs in sync when entering/leaving edit mode.
  useEffect(() => {
    if (!formRef.current) return;

    const form = formRef.current;
    const titleInput = form.elements.namedItem('title') as HTMLInputElement;
    const descriptionInput = form.elements.namedItem(
      'description'
    ) as HTMLTextAreaElement;
    const prioritySelect = form.elements.namedItem(
      'priority'
    ) as HTMLSelectElement;

    if (editingTask) {
      if (titleInput) titleInput.value = editingTask.title;
      if (descriptionInput) descriptionInput.value = editingTask.description;
      if (prioritySelect) prioritySelect.value = editingTask.priority;
      return;
    }

    // Leaving edit mode: clear stale values so "New Task" starts fresh.
    form.reset();
  }, [editingTask]);

  return (
    // 🆕 form action: pass the action function directly to <form>
    // No need for onSubmit + e.preventDefault()!
    // The form auto-resets after the action completes.
    <form ref={formRef} action={formAction} className="task-form">
      <h3>
        {editingTask ? '✏️ Edit Task' : '➕ New Task'}
        <span className="feature-tag">useActionState</span>
      </h3>

      <div className="form-row">
        {/* Uncontrolled inputs — React 19 reads them via FormData */}
        <input
          name="title"
          className="form-input"
          type="text"
          placeholder="Task title"
          required
          // If the action returned an error, repopulate the field
          // so the user doesn't lose their input.
          defaultValue={formState?.values?.title ?? ''}
          key={formState?.values?.title ?? 'title'}
        />
        <select
          name="priority"
          className="form-input"
          defaultValue={formState?.values?.priority ?? 'medium'}
          key={formState?.values?.priority ?? 'priority'}
          style={{ flex: '0 0 140px' }}
        >
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
      </div>

      <div className="form-row">
        <textarea
          name="description"
          className="form-input"
          placeholder="Description (optional)"
          defaultValue={formState?.values?.description ?? ''}
          key={formState?.values?.description ?? 'description'}
        />
      </div>

      <div className="form-row">
        {/* 🆕 SubmitButton uses useFormStatus internally */}
        <SubmitButton
          label={editingTask ? 'Update Task' : 'Add Task'}
          pendingLabel={editingTask ? 'Updating…' : 'Adding…'}
        />
        {editingTask && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>

      {formState?.error && (
        <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: 8 }}>
          {formState.error}
        </p>
      )}
    </form>
  );
}
