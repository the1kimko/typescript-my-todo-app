import React from 'react';
import type {Todo } from '../types/Todo';

/**
 * Props for the TodoItem component.
 */
interface TodoItemProps {
    /** The todo item to display */
    todo: Todo;
    /** Handler called when the todo is toggled (completed/uncompleted) */
    onToggle: (id: number) => void;
    /** Handler called when the todo is deleted */
    onDelete: (id: number) => void;
    /** Handler called when editing starts, receives todo id and current text */
    onEditStart: (id: number, currentText: string) => void;
}

/**
 * Component representing a single todo item.
 * Displays the todo text, a checkbox for completion status, and action buttons.
 * Applies different stylig based on completion status.
 */
const TodoItem: React.FC<TodoItemProps> = ({
    todo,
    onToggle,
    onDelete,
    onEditStart,
}) => {
    /**
     * Handles the checkbox toggle click event.
     */
    const handleToggle = () => {
        onToggle(todo.id);
    };

    /**
     * Handles the edit button click event.
     */
    const handleEditClick = () => {
        onEditStart(todo.id, todo.text);
    };

    /**
     * Handles the delete button click event.
     */
    const handleDeleteClick = () => {
        onDelete(todo.id);
    };

    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {/* Completion toggle checkbox */}
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggle}
                aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete' }`}
                className="todo-checkbox"
            />

            {/* Todo text content */}
            <span className={`todo-text ${todo.completed ? 'strikethrough' : ''}`}>
                {todo.text}
            </span>

            {/* Action buttons */}
            <div className="todo-actions">
                <button
                    onClick={handleEditClick}
                    aria-label={`Edit "${todo.text}"`}
                    className="edit-btn"
                >
                    Edit
                </button>
                <button
                    onClick={handleDeleteClick}
                    aria-label={`Delete "${todo.text}"`}
                    className="delete-btn"
                >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default TodoItem;