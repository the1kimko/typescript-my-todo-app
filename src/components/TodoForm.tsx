import React, { useState } from 'react';

interface TodoFormProps {
    onAddTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
    const [input, setInput] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (input.trim()) {
            onAddTodo(input.trim());
            setInput('');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                placeholder='Add a new todo...'
                required
            />
            <button type='submit'>Add</button>
        </form>
    );
};

export default TodoForm;