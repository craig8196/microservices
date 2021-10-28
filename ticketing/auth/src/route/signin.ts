import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validationHandler } from '../middleware/validation-handler';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { isValidPassword } from '../shared/password';


const JWT_KEY = process.env.JWT_KEY!;
const router = express.Router();

router.post(
  '/api/users/signin',

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

    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }

    const isValid = await isValidPassword(password, user.hash);
    if (!isValid) {
      throw new BadRequestError('Invalid credentials');
    }

    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, JWT_KEY);

    req.session = {
      jwt: userJwt
    };

    res.status(200).send(user);
  }
);

export { router as signinRouter };

