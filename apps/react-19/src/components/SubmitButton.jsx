/**
 * 🆕 REACT 19 FEATURE: useFormStatus
 *
 * useFormStatus() reads the status of the parent <form> element.
 * It returns { pending, data, method, action }.
 *
 * IMPORTANT: Must be rendered inside a <form> that uses the
 * action prop. It reads the status of the NEAREST parent form.
 *
 * This enables "design system" submit buttons that automatically
 * show loading state without prop drilling.
 */
import { useFormStatus } from 'react-dom';

export default function SubmitButton({ label = 'Add Task', pendingLabel = 'Adding…' }) {
  // 🆕 useFormStatus: automatically knows if the parent form is submitting
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? pendingLabel : label}
      {pending && ' ⏳'}
    </button>
  );
}

