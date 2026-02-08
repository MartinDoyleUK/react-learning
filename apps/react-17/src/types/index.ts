/**
 * Shared TypeScript type definitions for the React 17 app
 */

export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
}

export interface TaskActionPayload {
  id: number;
  updates: Partial<Omit<Task, 'id' | 'createdAt'>>;
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: TaskFormData }
  | { type: 'TOGGLE_TASK'; payload: number }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'EDIT_TASK'; payload: TaskActionPayload };

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

