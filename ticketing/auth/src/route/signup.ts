import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validationHandler } from '@crj-gittix/common';
import { BadRequestError } from '@crj-gittix/common';
import { User } from '../models/user';
import { toHash } from '../api/password';


const JWT_KEY = process.env.JWT_KEY!;
const router = express.Router();

router.post(
  '/api/users/signup',

  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 8, max: 32 })
    .withMessage('Password must be between 4 and 32 characters'),
  validationHandler,

  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const hash = await toHash(password);

    const user = User.mk({
      email,
      hash: {
        key: hash.key,
        settings: {
          salt: hash.settings.salt,
          iterations: hash.settings.iterations,
          keylen: hash.settings.keylen,
          digest: hash.settings.digest,
        }
      }
    });
    await user.save();

    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, JWT_KEY);

    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };

