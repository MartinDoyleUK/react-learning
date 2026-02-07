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
 */
import { useActionState } from 'react';
import SubmitButton from './SubmitButton';

export default function TaskForm({ onAdd }) {
  // 🆕 useActionState: manages form submission state automatically
  const [formState, formAction, isPending] = useActionState(
    async (previousState, formData) => {
      const title = formData.get('title').trim();
      const description = formData.get('description').trim();
      const priority = formData.get('priority');

      if (!title) {
        return { error: 'Title is required' };
      }

      // Simulate async operation (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 400));

      onAdd({ title, description, priority });

      return { success: true };
    },
    null
  );

  return (
    // 🆕 form action: pass the action function directly to <form>
    // No need for onSubmit + e.preventDefault()!
    // The form auto-resets after a successful submission.
    <form action={formAction} className="task-form">
      <h3>
        ➕ New Task
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
        />
        <select
          name="priority"
          className="form-input"
          defaultValue="medium"
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
        />
      </div>

      <div className="form-row">
        {/* 🆕 SubmitButton uses useFormStatus internally */}
        <SubmitButton />
      </div>

      {formState?.error && (
        <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: 8 }}>
          {formState.error}
        </p>
      )}
    </form>
  );
}
