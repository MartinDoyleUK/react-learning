/**
 * ⚡ FEATURE: useImperativeHandle + forwardRef
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
 * IMPORTANT: useImperativeHandle must be used with forwardRef
 * (in React 17 & 18). In React 19, forwardRef is no longer needed.
 *
 * Signature: useImperativeHandle(ref, createHandle, [deps])
 */
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const FancyInput = forwardRef(function FancyInput({ placeholder = 'Type here…' }, ref) {
  const inputRef = useRef(null);
  const [history, setHistory] = useState([]);

  // ⚡ useImperativeHandle: expose a custom API instead of the raw DOM node
  useImperativeHandle(
    ref,
    () => ({
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
});

export default FancyInput;

