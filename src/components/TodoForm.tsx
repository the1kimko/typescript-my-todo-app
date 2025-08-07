import React, { useState } from 'react';

/**
 * Props for the TodoForm component
 */
interface TodoFormProps {
  /** Handler called when a new todo should be added */
  onAddTodo: (text: string) => void;
}

/**
 * Form component for adding new todo items.
 * Handles input validation, form submission, and input clearing.
 * Prevents adding empty or whitespace-only todos.
 */
const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  /** Current input text value */
  const [input, setInput] = useState<string>('');

  /**
   * Handles form submission
   * Prevents default form behavior, validates input, and adds todo if valid
   * @param e - Form submission event
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const trimmedInput = input.trim();

    // Only add todo if input contains non-whitespace characters
    if (trimmedInput) {
      onAddTodo(trimmedInput);
      setInput(''); // Clear input after successful submission
    }
  };

  /**
   * Handles input text changes
   * @param e - Input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Add a new todo..."
          aria-label="New todo text"
          className="todo-input"
          maxLength={200} // Prevent extremely long todos
          autoComplete="off" // Disable autocomplete for todo input
          required
        />
        <button
          type="submit"
          disabled={!input.trim()} // Disable when input is empty/whitespace
          className="add-button"
          aria-label="Add new todo"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;