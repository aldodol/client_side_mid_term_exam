import React, { useState, useEffect } from 'react';
import './App.css';
import TodoItem from './TodoItem';

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    } else {
      alert("Todo cannot be empty!");
    }
  };

  const handleRemoveTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    const newText = prompt("Edit todo:", todoToEdit.text);
    if (newText !== null && newText.trim()) {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo
      ));
    } else if (newText === '') {
      alert("Todo cannot be empty!");
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Completed') return todo.completed;
    if (filter === 'Active') return !todo.completed;
    return true; // All
  });

  return (
    <div className="appContainer">
      <div className="todoWrapper">
        <h1 className="appTitle">Todo App</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleAddTodo(); }}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="input"
            placeholder="Add a new task"
          />
          <button type="submit" className="todoButton">Add</button>
        </form>
        <div>
          <button onClick={() => setFilter('All')} className="filterButton">All</button>
          <button onClick={() => setFilter('Completed')} className="filterButton">Completed</button>
          <button onClick={() => setFilter('Active')} className="filterButton">Active</button>
        </div>
        <ul className="todoList">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => handleToggleComplete(todo.id)}
              onEdit={() => handleEditTodo(todo.id)}
              onDelete={() => handleRemoveTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;