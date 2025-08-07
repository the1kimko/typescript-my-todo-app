// ==============================
// Todo Model
// ==============================

// Represents a single todo item.
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: Date;
}

// ==============================
// Shared Prop Types
// ==============================

/**
 * Function signature for actions on a Todo by ID.
 */
export type TodoIdHandler = (id: number) => void;

/**
 * Props for adding a new todo.
 */
export interface TodoFormProps {
    onAddTodo: (text: string) => void;
}

/**
 * Props shared between components displaying Todo items.
 */
export interface TodoItemBaseProps {
    onToggle: TodoIdHandler;
    onDelete: TodoIdHandler;
    onEditStart?: (id: number, currentText: string) => void;
}

// ==============================
// Component Props
// ==============================

/**
 * Props for the TodoItem component.
 */
export interface TodoItemProps extends TodoItemBaseProps {
    todo: Todo;
}
  
/**
* Props for the TodoList component.
*/
export interface TodoListProps extends TodoItemBaseProps {
    todos: Todo[];
}