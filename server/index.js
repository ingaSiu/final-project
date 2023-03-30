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
      createdAt: Date.now(),
      updatedAt: null,
    });
    await con.close();
    return res.send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

// PUT question

app.put('/question/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const filter = { _id: ObjectId(id), userId: userId };
    const { title, question } = req.body;

    if (!(title && question)) {
      return res.status(400).send('All input is required');
    }

    const con = await client.connect();
    const existingQuestion = await con.db('final-project').collection('questions').findOne(filter);
    console.log(existingQuestion);
    if (!existingQuestion) {
      return res.status(404).send({ error: 'Question with given ID does not exist.' });
    }
    const updateObj = {
      title: title,
      question: question,
      userId: existingQuestion.userId,
      createdAt: existingQuestion.createdAt,
      updatedAt: Date.now(),
    };

    const data = await con.db('final-project').collection('questions').updateOne(filter, { $set: updateObj });
    await con.close();
    return res.send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

// DELETE question

app.delete('/question/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const filter = { _id: ObjectId(id), userId: userId };
    const con = await client.connect();
    const data = await con.db('final-project').collection('questions').deleteOne(filter);

    if (data.deletedCount && data.deletedCount > 0) {
      return res.status(204).send();
    }
    if (data.deletedCount === 0) {
      return res.status(404).send();
    }
    return res.status(500).send({ error: 'Data could not be deleted.' });
  } catch (error) {
    return res.status(500).send({ error: error.toString() });
  }
});

// POST answer

app.post('/question/:id/answers', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const filter = { _id: ObjectId(id), userId: userId };
    const con = await client.connect();

    const { answer } = req.body;

    if (!answer) {
      return res.status(400).send({ error: 'Bad data.' });
    }
    const existingQuestion = await con.db('final-project').collection('questions').findOne(filter);

    if (!existingQuestion) {
      return res.status(404).send({ error: 'Question with given ID does not exist.' });
    }

    const data = await con.db('final-project').collection('answers').insertOne({
      answer: answer,
      userId: userId,
      questionId: id,
      rating: 0,
      createdAt: Date.now(),
      updatedAt: null,
    });
    await con.close();
    return res.send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

// PUT answer

app.put('/answer/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const filter = { _id: ObjectId(id), userId: userId };
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).send('Answer is required');
    }

    const con = await client.connect();
    const existingAnswer = await con.db('final-project').collection('answers').findOne(filter);
    console.log(existingAnswer);
    if (!existingAnswer) {
      return res.status(404).send({ error: 'Answer with given ID does not exist.' });
    }
    const updateObj = {
      answer: answer,
      userId: existingAnswer.userId,
      questionId: existingAnswer.questionId,
      rating: existingAnswer.rating,
      createdAt: existingAnswer.createdAt,
      updatedAt: Date.now(),
    };

    const data = await con.db('final-project').collection('answers').updateOne(filter, { $set: updateObj });
    await con.close();
    return res.send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

// DELETE answer

app.delete('/answer/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const filter = { _id: ObjectId(id), userId: userId };
    const con = await client.connect();
    const data = await con.db('final-project').collection('answers').deleteOne(filter);

    if (data.deletedCount && data.deletedCount > 0) {
      return res.status(204).send();
    }
    if (data.deletedCount === 0) {
      return res.status(404).send();
    }
    return res.status(500).send({ error: 'Data could not be deleted.' });
  } catch (error) {
    return res.status(500).send({ error: error.toString() });
  }
});
