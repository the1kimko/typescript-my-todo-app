// src/App.tsx
import React, { useState, useCallback } from 'react';
import type { Todo } from './types/Todo';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import EditTodoForm from './components/EditTodoForm';
import './App.css';

/**
 * Main App component that manages the todo application state and functionality.
 * Handles adding, editing, deleting, and toggling todos.
 * Manages edit mode state for inline editing.
 */
const App: React.FC = () => {
  // ==============================
  // State Management
  // ==============================

  /** Array of all todo items */
  const [todos, setTodos] = useState<Todo[]>([]);

  /** ID of the todo currently being edited, null when not editing */
  const [editingId, setEditingId] = useState<number | null>(null);

  /** Text content of the todo being edited */
  const [editText, setEditText] = useState<string>('');

  // ==============================
  // Todo CRUD Operations
  // ==============================

  /**
   * Adds a new todo to the list
   * @param text - The text content for the new todo
   */
  const addTodo = useCallback((text: string): void => {
    const newTodo: Todo = {
      id: Date.now(), // Simple ID generation - consider UUID for production
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, []);

  /**
   * Toggles the completed status of a todo
   * @param id - The ID of the todo to toggle
   */
  const toggleTodo = useCallback((id: number): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  /**
   * Removes a todo from the list
   * @param id - The ID of the todo to delete
   */
  const deleteTodo = useCallback((id: number): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  // ==============================
  // Edit Mode Handlers
  // ==============================

  /**
   * Enters edit mode for a specific todo
   * @param id - The ID of the todo to edit
   * @param currentText - The current text of the todo
   */
  const startEditing = useCallback((id: number, currentText: string): void => {
    setEditingId(id);
    setEditText(currentText);
  }, []);

  /**
   * Cancels edit mode without saving changes
   */
  const cancelEdit = useCallback((): void => {
    setEditingId(null);
    setEditText('');
  }, []);

  /**
   * Saves the edited todo text and exits edit mode
   * Only saves if there's valid text content
   */
  const saveEdit = useCallback((): void => {
    if (editingId !== null && editText.trim()) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editingId ? { ...todo, text: editText.trim() } : todo
        )
      );
      cancelEdit();
    }
  }, [editingId, editText, cancelEdit]);

  // ==============================
  // Stats Calculations
  // ==============================

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const remainingTodos = totalTodos - completedTodos;

  // ==============================
  // Render
  // ==============================

  return (
    <div className="app">
      {/* App Header */}
      <header className="app-header">
        <h1>TypeScript Todo App</h1>
      </header>

      {/* Add New Todo Form */}
      <section className="add-todo-section">
        <TodoForm onAddTodo={addTodo} />
      </section>

      {/* Main Todo Content */}
      <main className="todo-main">
        {editingId !== null ? (
          // Show edit form when editing
          <section className="edit-section">
            <EditTodoForm
              editText={editText}
              onChange={setEditText}
              onSave={saveEdit}
              onCancel={cancelEdit}
            />
          </section>
        ) : (
          // Show regular todo list when not editing
          <section className="list-section">
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEditStart={startEditing}
            />
          </section>
        )}
      </main>

      {/* Statistics Footer */}
      <footer className="todo-stats">
        <p>
          <span className="stat">Total: {totalTodos}</span>
          {' | '}
          <span className="stat completed">Completed: {completedTodos}</span>
          {' | '}
          <span className="stat remaining">Remaining: {remainingTodos}</span>
        </p>
      </footer>
    </div>
  );
};

export default App;