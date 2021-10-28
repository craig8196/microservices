import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './route/current-user';
import { signinRouter } from './route/signin';
import { signoutRouter } from './route/signout';
import { signupRouter } from './route/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.set('trust proxy', true);

app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', () => {
  throw new NotFoundError();
});

/* This must come at the end of app.use() */
app.use(errorHandler);

const port = 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }

  app.listen(port, () => {
    console.log(`Using port: ${port}`);
  });
};

start();

