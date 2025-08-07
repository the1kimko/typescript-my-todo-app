export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: Date;
}

// Component props
export interface TodoFormProps {
    onAddTodo: (text: string) => void;
}

export interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}