import React from 'react';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  return (
    <li className="todoItem">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        className="checkbox"
      />
      <span className="todo-text" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={onEdit} className="editButton">Edit</button>
      <button onClick={onDelete} className="deleteButton">Delete</button>
    </li>
  );
};

export default TodoItem;