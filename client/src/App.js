import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const URL = 'http://localhost:9000';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const users = await axios.get(URL);
    setUsers(users.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <h1>Holy crap it works!</h1>
      <form
        onSubmit={async e => {
          e.preventDefault();
          await axios.post(URL, { name, email });
          getUsers();
          setName('');
          setEmail('');
        }}
      >
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
      <div className="user-list">
        {users.map(user => {
          return (
            <div key={user.id}>
              <div>{user.name}</div>
              <div>{user.email}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
