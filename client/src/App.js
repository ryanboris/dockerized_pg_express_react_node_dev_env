import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const URL = 'http://localhost:9000';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  const handle = {
    submit(e) {
      e.preventDefault();
      axios
        .post(URL, { name, email })
        .then(() => {
          setName('');
          setEmail('');
        })
        .catch(({ code, msg }) => console.error({ code, msg }));
    },
    change(e) {
      const { value } = e.target;
      return value === name ? setName(value) : setEmail(value);
    }
  };

  useEffect(() => {
    axios
      .get(URL)
      .then(res => {
        setUsers(res.data);
      })
      .catch(({ code, msg }) => console.error({ code, msg }));
  }, []);

  return (
    <div className="App">
      <h1>Holy crap it works!</h1>
      <form onSubmit={handle.submit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={handle.change}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={handle.change}
        />
        <input type="submit" value="submit" />
      </form>
      <div className="user-list">
        {users.map(({ id, name, email }) => {
          return (
            <div key={id}>
              <div>{name}</div>
              <div>{email}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
