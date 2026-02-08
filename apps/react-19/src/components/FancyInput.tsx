/**
 * ⚡ FEATURE: useImperativeHandle
 * 🆕 REACT 19: No forwardRef needed!
 *
 * useImperativeHandle customises the ref value that a parent
 * component receives. Instead of exposing the raw DOM element,
 * you expose a controlled API (e.g., focus, clear, selectAll).
 *
 * This is useful when:
 *  • You want to limit what a parent can do with a ref
 *  • You need to combine multiple DOM operations into one method
 *  • You're building a reusable component library
 *
 * 🆕 REACT 19: In React 17 & 18, you needed forwardRef to pass a
 * ref through a function component. In React 19, ref is just a
 * regular prop — no wrapper needed!
 *
 * BEFORE (React 17/18):
 *   const FancyInput = forwardRef(function FancyInput(props, ref) {
 *     useImperativeHandle(ref, () => ({ focus() { … } }));
 *   });
 *
 * AFTER (React 19):
 *   function FancyInput({ ref }) {
 *     useImperativeHandle(ref, () => ({ focus() { … } }));
 *   }
 *
 * Signature: useImperativeHandle(ref, createHandle, [deps])
 */
import { useImperativeHandle, useRef, useState } from 'react';

export interface FancyInputHandle {
  focus: () => void;
  clear: () => void;
  selectAll: () => void;
  getValue: () => string;
}

interface FancyInputProps {
  ref?: React.Ref<FancyInputHandle>;
  placeholder?: string;
}

// 🆕 React 19: ref is just a prop — no forwardRef wrapper!
export default function FancyInput({
  ref,
  placeholder = 'Type here…',
}: FancyInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<string[]>([]);

  // ⚡ useImperativeHandle: expose a custom API instead of the raw DOM node
  useImperativeHandle(
    ref,
    (): FancyInputHandle => ({
      // Custom method: focus the input
      focus() {
        inputRef.current?.focus();
      },
      // Custom method: clear the input and log to history
      clear() {
        if (inputRef.current) {
          const oldValue = inputRef.current.value;
          inputRef.current.value = '';
          if (oldValue) {
            setHistory((h) => [...h, `Cleared: "${oldValue}"`]);
          }
        }
      },
      // Custom method: select all text
      selectAll() {
        inputRef.current?.select();
      },
      // Custom method: get current value without a controlled component
      getValue() {
        return inputRef.current?.value ?? '';
      },
    }),
    [] // deps — recreate handle only when deps change
  );

  return (
    <div className="fancy-input">
      <input
        ref={inputRef}
        type="text"
        className="form-input"
        placeholder={placeholder}
      />
      {history.length > 0 && (
        <div className="fancy-input-history">
          <small>History: {history.join(' → ')}</small>
        </div>
      )}
    </div>
  );
}

