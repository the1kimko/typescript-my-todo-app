import React from 'react';

/**
 * Props for the EditTodoForm component.
 */
interface EditTodoFormProps {
    /** Current text value being edited */
    editText: string;
    /** Handler called when the input text changes */
    onChange: (text: string) => void;
    /** Handler called when the form is submitted or save button is clicked */
    onSave: () => void;
    /** Handler called when editing is cancelled */
    onCancel: () => void;
}

/**
 * Form component for editing an existing todo item.
 * Provides input field with save/cancel actions and keyboard shortcuts.
 */
const EditTodoForm: React.FC<EditTodoFormProps> = ({
    editText,
    onChange,
    onSave,
    onCancel,
}) => {
    /**
     * Handles form submission - prevents default and triggers save
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave();
    };
  
    /**
     * Handles Escape key to cancel editing
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            onCancel();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-form">
            <input
                type="text"
                value={editText}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                aria-label="Edit todo"
                placeholder="Edit todo text..."
            />
            <div className="form-actions">
                <button type="submit" disabled={!editText.trim()}>
                    Save
                </button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default EditTodoForm;