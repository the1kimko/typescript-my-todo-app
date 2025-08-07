import React from 'react';
import type {Todo } from '../types/Todo';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    return (
        <li className={`todo-item ${todo.completed} ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
    );
};

export default TodoItem;