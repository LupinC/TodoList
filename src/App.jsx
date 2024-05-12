import React, { useState } from 'react';
import CreateAccount from './CreateAccount';
import LoginForm from './LoginForm';
import Logout from './Logout';
import TodoList from './TodoList';
import NewTodoForm from './NewTodoForm';
import useTodoService from './todoService';

const App = () => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  //destructuring
  //can directly use without having to reference them through useTodoService.
  const {
    currentUser,
    login,
    logout,
    createAccount,
    addTodo,
    updateTodo,
    deleteTodo,
    getTodos,
  } = useTodoService();


  // function calling
  const handleCreateAccountSuccess = () => {
    setIsCreatingAccount(false);
  };


  // short circuiting
  return (
    <div>
      {!currentUser ? (
        isCreatingAccount ? (
          <CreateAccount createAccount={createAccount} onSuccess={handleCreateAccountSuccess} />
        ) : (
          <>
            <LoginForm login={login} />
            <button className="button" onClick={() => setIsCreatingAccount(true)}>Create Account</button>
          </>
        )
      ) : (
        <>
          <Logout logout={logout} />
          <NewTodoForm addTodo={addTodo} />
          <TodoList todos={getTodos()} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        </>
      )}
    </div>
  );
};

export default App;
