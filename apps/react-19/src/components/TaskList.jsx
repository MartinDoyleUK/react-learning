/**
 * ⚡ FEATURES: List Rendering, key prop, useLayoutEffect
 *
 * key prop        — each TaskItem gets a unique, stable key so React
 *                   can diff the list efficiently. Never use array
 *                   index as key when items can be reordered/deleted.
 * useLayoutEffect — fires synchronously after DOM mutations but
 *                   before the browser paints. Used here to scroll
 *                   the newest task into view immediately.
 */
import { useRef, useLayoutEffect } from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  const listEndRef = useRef(null);
  const prevLengthRef = useRef(tasks.length);

  // useLayoutEffect: scroll to the bottom when a task is added.
  // Runs synchronously after the DOM update, so the user never
  // sees a flash of un-scrolled content.
  useLayoutEffect(() => {
    if (tasks.length > prevLengthRef.current && listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    prevLengthRef.current = tasks.length;
  }, [tasks.length]);

  if (tasks.length === 0) {
    return <div className="task-list-empty">No tasks match your search.</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        // key: unique, stable identifier — critical for reconciliation
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
      <div ref={listEndRef} />
    </div>
  );
}

