
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes }  = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.status(201).send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;
  const id = randomBytes(8).toString('hex');
  const { content } = req.body;
  const status = 'pending';

  const comments = commentsByPostId[postId] || [];

  comments.push({ id, content, status });
  commentsByPostId[postId] = comments;

  await axios.post('http://event-bus-srv:5000/events', {
    type: 'CommentCreated',
    data: {
      id,
      content,
      status,
      postId
    }
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  console.log(req.body);
  const { type, data } = req.body;

  switch (type) {
    case 'CommentModerated':
      {
        const { id, postId, status } = data;

        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
          return comment.id === id;
        });
        comment.status = status;

        await axios.post('http://event-bus-srv:5000/events', {
          type: 'CommentUpdated',
          data: {
            id,
            content: comment.content,
            status,
            postId
          },
        });
      }
      break;
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});

