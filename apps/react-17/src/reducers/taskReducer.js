/**
 * ⚡ FEATURE: useReducer — complex state management
 *
 * useReducer is preferred over useState when:
 *  • Next state depends on previous state in non-trivial ways
 *  • Multiple sub-values are updated together
 *  • You want a predictable, testable state machine
 *
 * This reducer manages all CRUD operations for tasks.
 */

export const initialTasks = [
  {
    id: 1,
    title: 'Learn React Hooks',
    description: 'Master useState, useEffect, useContext, and useReducer',
    priority: 'high',
    completed: true,
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'Build a Portfolio Project',
    description: 'Create a task manager to practise all core concepts',
    priority: 'high',
    completed: false,
    createdAt: '2025-02-01T09:00:00Z',
  },
  {
    id: 3,
    title: 'Study React.memo & useMemo',
    description: 'Understand when and why to memoize components and values',
    priority: 'medium',
    completed: false,
    createdAt: '2025-02-10T14:30:00Z',
  },
  {
    id: 4,
    title: 'Read Error Boundary docs',
    description: 'Learn how class-based error boundaries catch render errors',
    priority: 'low',
    completed: false,
    createdAt: '2025-02-15T08:00:00Z',
  },
  {
    id: 5,
    title: 'Explore React Portals',
    description: 'Use createPortal to render modals outside the DOM hierarchy',
    priority: 'medium',
    completed: false,
    createdAt: '2025-02-18T11:00:00Z',
  },
];

let nextId = 6;

export default function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          ...action.payload,
          id: nextId++,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ];

    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );

    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload);

    case 'EDIT_TASK':
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.updates }
          : task
      );

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

