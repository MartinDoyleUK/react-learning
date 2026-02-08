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
 *
 * ⚠️ FOOT-GUN: useFormStatus reads from the nearest PARENT <form>.
 * If you call it in the same component that renders the <form>,
 * it won't work — it must be in a CHILD component rendered inside
 * the form. That's why SubmitButton is a separate component.
 */
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  label?: string;
  pendingLabel?: string;
}

export default function SubmitButton({
  label = 'Add Task',
  pendingLabel = 'Adding…',
}: SubmitButtonProps) {
  // 🆕 useFormStatus: automatically knows if the parent form is submitting
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? pendingLabel : label}
      {pending && ' ⏳'}
    </button>
  );
}

