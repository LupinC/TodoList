import React, { useState } from 'react';

const CreateAccount = ({ createAccount, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (createAccount(username, password)) {
      setUsername('');
      setPassword('');
      setError('');
      onSuccess();
    } else {
      setError('User already exists');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Account</h2>
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
      <button className="button" type="submit">Create</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateAccount;
