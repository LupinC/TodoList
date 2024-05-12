import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  {/* in {} means runs as javascript codes and put it down below */}
  {/* if there is no to dos, show the strings of no todos, ie short circuiting */}
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
