import { useState, useEffect } from 'react';

// structure
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
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('todoData');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [currentUser, setCurrentUser] = useState(null);

  // run this function every time the property in the array changes
  // cannot render hooks conditionally
  // so put them at the top

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(data));
  }, [data]);

  const login = (username, password) => {
    if (data.users[username] && data.users[username].password === password) {
      setCurrentUser(username);
      return true;
    }
    return false;
  };

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
          password: password,
          todos: [],
        },
      },
    });
    return true;
  };

  const addTodo = (title) => {
    if (!currentUser) return;
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    const userTodos = [...data.users[currentUser].todos, newTodo];
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
