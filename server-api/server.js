const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// const jwtConfig = require('../server-api/jwtConfig');
const db = require('../server-api/db.json');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5000', // Replace with your frontend's address
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find((user) => user.username === username && user.password === password);

  if (user) {
    const token = jwt.sign({ username: user.username }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log(username,password);
  const existingUser = db.users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  db.users.push({ username, password });
  res.status(201).json({ message: 'Registration successful' });
});


const port = 5000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

