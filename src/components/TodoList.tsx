import React from 'react';
import type { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

/**
 * Props for the TodoList component
 */
interface TodoListProps {
  /** Array of todo items to display */
  todos: Todo[];
  /** Handler called when a todo's completed status is toggled */
  onToggle: (id: number) => void;
  /** Handler called when a todo is deleted */
  onDelete: (id: number) => void;
  /** Handler called when editing starts on a todo */
  onEditStart: (id: number, currentText: string) => void;
}

/**
 * Component that renders a list of todo items.
 * Shows an empty state message when no todos exist.
 * Each todo is rendered as a TodoItem component with full functionality.
 */
const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEditStart,
}) => {
  // Show empty state when no todos exist
  if (todos.length === 0) {
    return (
      <div className="empty-state" role="alert">
        <p>No todos available. Please add some!</p>
      </div>
    );
  }

  return (
    <ul className="todo-list" role="list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEditStart={onEditStart}
          aria-label={`Todo item: ${todo.text}`}
        />
      ))}
    </ul>
  );
};

export default TodoList;