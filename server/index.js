console.log('Server started');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const { MongoClient, ObjectId } = require('mongodb');
const dbConStr = process.env.DB_CON_STR;

const client = new MongoClient(dbConStr);

app.listen(port, () => {
  console.log(`it works on ${port} port`);
});

process.on('exit', () => {
  // Closes db connections when server exits
  client.close();
  console.log(' Exit app closed...');
});

process.on('SIGINT', () => {
  // Closes db connections when server crashed or killed
  client.close();
  console.log(' Sigint app closed...');
});

// get users

app.get('/', auth, async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('final-project').collection('users').find().toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
});

// Register user

app.post('/register', async (req, res) => {
  try {
    const con = await client.connect();

    const { username, password } = req.body;

    if (!(password && username)) {
      res.status(400).send('All input is required');
    }
    const filter = { username: username };
    const existingUser = await con.db('final-project').collection('users').findOne(filter);

    if (existingUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const insertResponse = await con.db('final-project').collection('users').insertOne({
      username: username,
      password: encryptedPassword,
    });

    const token = jwt.sign({ userId: insertResponse.insertedId.toString(), username }, process.env.TOKEN_KEY, {
      expiresIn: '2h',
    });

    await con.close();
    return res.status(201).json(token);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
});

// Login user

app.post('/login', async (req, res) => {
  try {
    const con = await client.connect();
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).send('All input is required');
    }
    const filter = { username: username };
    const existingUser = await con.db('final-project').collection('users').findOne(filter);

    if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
      const token = jwt.sign({ userId: existingUser._id, username }, process.env.TOKEN_KEY, {
        expiresIn: '2h',
      });

      return res.status(200).json(token);
    }

    return res.status(401).send('Invalid Credentials');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
});

// POST question

app.post('/question', auth, async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, question } = req.body;

    if (!(title && question)) {
      return res.status(400).send('All input is required');
    }

    const con = await client.connect();
    const data = await con.db('final-project').collection('questions').insertOne({
      title: title,
      question: question,
      userId: userId,
      rating: 0,
      createdAt: Date.now(),
      updatedAt: null,
    });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});
