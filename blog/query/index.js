
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes }  = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

const handleEvent = (event) => {
  console.log(event);
  const { type, data } = event;

  switch (type) {
    case 'PostCreated':
      {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
      }
      break;
    case 'CommentCreated':
      {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
      }
      break;
    case 'CommentUpdated':
      {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
          return comment.id === id;
        });
        
        comment.content = content;
        comment.status = status;
      }
      break;
  }
};

app.post('/events', (req, res) => {
  handleEvent(req.body);

  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');

  const res = await axios.get('http://event-bus-srv:5000/events');

  for (let event of res.data) {
    handleEvent(event);
  }
});

