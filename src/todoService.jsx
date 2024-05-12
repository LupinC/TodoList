import { useState } from 'react';


// any time you wnat to change a state, create a brand new thing like todos so that you are not mutating the current states


const initialData = {
  users: {
    'username1': {
      password: 'hashed_password1',
      todos: [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: false },
      ],
    },
    'username2': {
      password: 'hashed_password2',
      todos: [
        { id: 3, title: 'Todo 3', completed: true },
      ],
    },
  },
};

const useTodoService = () => {
  // to make it a property   ^, and we need {}
  // newItem-> array
  // setNewItem -> function
  // new item is a state variable that you cannot update
  const [data, setData] = useState(initialData);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username, password) => {
    if (data.users[username] && data.users[username].password === password) {
      setCurrentUser(username);
      return true;
    }
    return false;
  };

  // to check: console.log(todos)
  const logout = () => {
    setCurrentUser(null);
  };

  const createAccount = (username, password) => {
    if (data.users[username]) {
      return false; // User already exists
    }
    setData({
      ...data,
      users: {
        ...data.users,
        [username]: {
          password: password, // Ensure password is hashed
          todos: [],
        },
      },
    });
    return true;
  };

  const addTodo = (title) => {

    // if we have 2 settodos, it will only add one todolist
    // because the second one will overwrite the first one
    // todos => empty array
    // add one item to the end
    // at the second time, 
    // it is still an empty array
    // setTodos([
    //   ...todos, //brand new arrays
    //   {
    //     id: crypto.randomUUID(),
    //     title: newItem,
    //     completed: false
    //   },//adding one to the end of the array
    // ])
    
        // to address the issue we need to pass a function to set state
    if (!currentUser) return;
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    const userTodos = data.users[currentUser].todos.concat(newTodo);
    setData({
      ...data,
      users: {
        ...data.users,
        [currentUser]: {
          ...data.users[currentUser],
          todos: userTodos,
        },
      },
    });
  };

  const updateTodo = (todoId, updatedTodo) => {
    if (!currentUser) return;
    const userTodos = data.users[currentUser].todos.map((todo) =>
      todo.id === todoId ? { ...todo, ...updatedTodo } : todo
    );
    setData({
      ...data,
      users: {
        ...data.users,
        [currentUser]: {
          ...data.users[currentUser],
          todos: userTodos,
        },
      },
    });
  };

  const deleteTodo = (todoId) => {
    if (!currentUser) return;
    const userTodos = data.users[currentUser].todos.filter((todo) => todo.id !== todoId);
    setData({
      ...data,
      users: {
        ...data.users,
        [currentUser]: {
          ...data.users[currentUser],
          todos: userTodos,
        },
      },
    });
  };

  const getTodos = () => {
    if (!currentUser) return [];
    return data.users[currentUser].todos;
  };

  return {
    currentUser,
    login,
    logout,
    createAccount,
    addTodo,
    updateTodo,
    deleteTodo,
    getTodos,
  };
};

export default useTodoService;
