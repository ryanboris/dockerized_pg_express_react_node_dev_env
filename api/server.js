const express = require('express');
const cors = require('cors');
const db = require('../data/dbConfig');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  db('users')
    .then(users => {
      return res.status(200).json(users);
    })
    .catch(({ code, message }) => {
      return res.status(500).json({ code, message });
    });
});

server.post('/', (req, res) => {
  const { name, email } = req.body;

  db('users')
    .insert({ name, email })
    .then(user => {
      return res.status(201).json(user);
    })
    .catch(({ code, message }) => {
      return res.status(500).json({ code, message });
    });
});

server.listen(9000, () => console.log('Alive on 9000!'));
