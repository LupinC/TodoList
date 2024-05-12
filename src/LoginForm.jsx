import React, { useState } from 'react';
import "./styles.css"

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="button" type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
