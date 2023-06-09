console.log('Server started');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const authNoBlock = require('./middleware/authNoBlock');

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

    const encryptedPassword = await bcrypt.hash(password, 10);

    const insertResponse = await con.db('final-project').collection('users').insertOne({
      username: username,
      password: encryptedPassword,
    });

    const token = jwt.sign({ userId: insertResponse.insertedId.toString(), username }, process.env.TOKEN_KEY, {
      expiresIn: '2h',
    });

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
    const data = await con
      .db('final-project')
      .collection('questions')
      .insertOne({
        title: title,
        question: question,
        userId: ObjectId(userId),
        createdAt: Date.now(),
        updatedAt: null,
      });

    return res.send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

// PUT question

app.put('/question/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    //this is injected from auth middleware
    const { userId } = req.user;
    const filter = { _id: ObjectId(id), userId: ObjectId(userId) };
    const { title, question } = req.body;

    if (!(title && question)) {
      return res.status(400).send('All input is required');
    }

    const con = await client.connect();
    const existingQuestion = await con.db('final-project').collection('questions').findOne(filter);
    if (!existingQuestion) {
      return res.status(404).send({ error: 'Question with given ID does not exist.' });
    }
    const updateObj = {
      title: title,
      question: question,
      userId: ObjectId(existingQuestion.userId),
      createdAt: existingQuestion.createdAt,
      updatedAt: Date.now(),
    };

    const data = await con.db('final-project').collection('questions').updateOne(filter, { $set: updateObj });

    return res.send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

// DELETE question

app.delete('/question/:id', auth, async (req, res) => {
  console.log('delete on question triggered');
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const filter = { _id: ObjectId(id), userId: ObjectId(userId) };
    const con = await client.connect();
    const data = await con.db('final-project').collection('questions').deleteOne(filter);

    if (data.deletedCount && data.deletedCount > 0) {
      await con
        .db('final-project')
        .collection('answers')
        .deleteMany({ questionId: ObjectId(id) });
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
    const con = await client.connect();

    const { answer } = req.body;

    if (!answer) {
      return res.status(400).send({ error: 'Bad data.' });
    }
    const existingQuestion = await con
      .db('final-project')
      .collection('questions')
      .findOne({ _id: ObjectId(id) });

    if (!existingQuestion) {
      return res.status(404).send({ error: 'Question with given ID does not exist.' });
    }

    const data = await con
      .db('final-project')
      .collection('answers')
      .insertOne({
        answer: answer,
        userId: ObjectId(userId),
        questionId: ObjectId(id),
        rating: 0,
        createdAt: Date.now(),
        updatedAt: null,
      });

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
    const filter = { _id: ObjectId(id), userId: ObjectId(userId) };
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).send('Answer is required');
    }

    const con = await client.connect();
    const existingAnswer = await con.db('final-project').collection('answers').findOne(filter);
    if (!existingAnswer) {
      return res.status(404).send({ error: 'Answer with given ID does not exist.' });
    }
    const updateObj = {
      answer: answer,
      userId: ObjectId(existingAnswer.userId),
      questionId: ObjectId(existingAnswer.questionId),
      rating: existingAnswer.rating,
      createdAt: existingAnswer.createdAt,
      updatedAt: Date.now(),
    };

    const data = await con.db('final-project').collection('answers').updateOne(filter, { $set: updateObj });

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
    const filter = { _id: ObjectId(id), userId: ObjectId(userId) };
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

// get questions

app.get('/questions', async (req, res) => {
  try {
    const { sortDate, sortAnswer, answeredFilter } = req.query;
    let sortObj = {};
    if (sortAnswer) {
      sortObj = { ...sortObj, ...{ answersCount: sortAnswer === 'dsc' ? -1 : 1 } };
    }
    if (sortDate) {
      sortObj = { ...sortObj, ...{ createdAt: sortDate === 'dsc' ? -1 : 1 } };
    }

    let aggregateArr = [
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'answers',
          localField: '_id',
          foreignField: 'questionId',
          as: 'answers',
        },
      },
      {
        $project: {
          _id: '$_id',
          title: '$title',
          question: '$question',
          userId: '$userId',
          createdAt: '$createdAt',
          updatedAt: '$updatedAt',
          username: { $first: '$user.username' },
          answersCount: { $size: '$answers' },
        },
      },
    ];

    if (answeredFilter === 'false') {
      aggregateArr.push({
        $match: {
          answersCount: 0,
        },
      });
    } else if (answeredFilter) {
      aggregateArr.push({
        $match: {
          answersCount: { $gt: 0 },
        },
      });
    }

    if (sortAnswer || sortDate) {
      aggregateArr.push({
        $sort: sortObj,
      });
      console.log(sortObj);
    }

    const con = await client.connect();
    let data = con.db('final-project').collection('questions').aggregate(aggregateArr);

    data = await data.toArray();
    return res.send(data);
  } catch (error) {
    return res.status(500).send({ error: error.toString() });
  }
});

// get question with answers
//using different middleware which adds user details if token is present,but allows request even if no token provided
app.get('/questions/:id', authNoBlock, async (req, res) => {
  try {
    const { id } = req.params;
    let userId = null;
    //user can be also non logged in
    if (req.user) {
      userId = req.user.userId;
    }

    const filter = { _id: ObjectId(id) };

    const con = await client.connect();
    const question = await con.db('final-project').collection('questions').findOne(filter);
    if (!question) {
      return res.status(404).send({ error: 'Question with given ID does not exist.' });
    }

    const user = await con
      .db('final-project')
      .collection('users')
      .findOne({ _id: ObjectId(question.userId) });

    const answers = await con
      .db('final-project')
      .collection('answers')
      .aggregate([
        {
          $match: { questionId: ObjectId(question._id) },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $lookup: {
            from: 'usersRatings',
            localField: '_id',
            foreignField: 'answerId',
            as: 'ratings',
          },
        },
        {
          $project: {
            _id: '$_id',
            answer: '$answer',
            userId: '$userId',
            rating: '$rating',
            createdAt: '$createdAt',
            updatedAt: '$updatedAt',
            username: { $first: '$user.username' },
            ratings: '$ratings',
            liked: {
              $filter: {
                input: '$ratings',
                as: 'item',
                cond: { $eq: ['$$item.userId', ObjectId(userId)] },
              },
            },
          },
        },

        {
          $project: {
            _id: '$_id',
            answer: '$answer',
            userId: '$userId',
            rating: '$rating',
            createdAt: '$createdAt',
            updatedAt: '$updatedAt',
            username: '$username',
            ratings: '$ratings',
            liked: { $first: '$liked.value' },
          },
        },
      ])
      .toArray();

    const data = {
      _id: question._id,
      title: question.title,
      question: question.question,
      userId: question.userId,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      username: user ? user.username : null,
      answersCount: answers.length,
      answers: answers ? answers : [],
    };
    return res.send(data);
  } catch (error) {
    return res.status(500).send({ error: error.toString() });
  }
});

// POST LIKE DISLIKE
app.post('/rate/answers/:id', auth, async (req, res) => {
  try {
    const { userId } = req.user;
    let { rating } = req.body;

    const { id } = req.params;
    const filter = { answerId: ObjectId(id), userId: ObjectId(userId) };

    if (rating !== -1 && rating !== 1) {
      return res.status(400).send('Bad input');
    }

    const con = await client.connect();
    const existingAnswer = await con
      .db('final-project')
      .collection('answers')
      .findOne({ _id: ObjectId(id) });

    if (!existingAnswer) {
      return res.status(404).send({ error: 'Answer with given ID does not exist.' });
    }
    const userRating = await con.db('final-project').collection('usersRatings').findOne(filter);

    let ratingCount = rating;
    if (!userRating) {
      await con
        .db('final-project')
        .collection('usersRatings')
        .insertOne({
          answerId: ObjectId(id),
          userId: ObjectId(userId),
          value: rating,
        });
    } else {
      if (userRating.value === rating) {
        ratingCount = ratingCount * -1;
        await con.db('final-project').collection('usersRatings').deleteOne(filter);
      } else {
        ratingCount = ratingCount * 2;
        await con
          .db('final-project')
          .collection('usersRatings')
          .updateOne(filter, {
            $set: {
              answerId: userRating.answerId,
              userId: userRating.userId,
              value: rating,
            },
          });
      }
    }

    const updateAnswerObj = {
      answer: existingAnswer.answer,
      userId: ObjectId(existingAnswer.userId),
      questionId: ObjectId(existingAnswer.questionId),
      rating: existingAnswer.rating + ratingCount,
      createdAt: existingAnswer.createdAt,
      updatedAt: existingAnswer.updatedAt,
    };

    await con
      .db('final-project')
      .collection('answers')
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: updateAnswerObj,
        },
      );

    return res.status(204).send();
  } catch (error) {
    return res.status(500).send({ error });
  }
});

