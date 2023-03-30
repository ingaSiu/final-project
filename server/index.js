console.log('Server started');
require('dotenv').config();

const express = require('express');
const cors = require('cors');

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

app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('final-project').collection('users').find().toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
});

app.post('/register', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('final-project').collection('users').insertOne({
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
    });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});
