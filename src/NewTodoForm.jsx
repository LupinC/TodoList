import React, { useState } from 'react';

const NewTodoForm = ({ addTodo }) => {
  // to make it a property   ^, and we need {}
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className='new-item-form'>
      <input
        type="text"
        placeholder="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button className= "btn" type="submit">Add</button>
    </form>
  );
};

export default NewTodoForm;
