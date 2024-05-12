import React from 'react';
import "./styles.css"

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const toggleComplete = (completed) => {
    updateTodo(todo.id, { completed });
  };

  return (
    <li className='todo-item'>
      <label className='todo-label'>
        <input
          type="checkbox"
          className='todo-checkbox'
          checked={todo.completed}
          onChange={(e) => toggleComplete(e.target.checked)}
        />
        {todo.title}
      </label>
      <button 
        // !!! do not remove the ()= the function calling
        onClick={() => deleteTodo(todo.id)}
        className="btn btn-danger">
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
