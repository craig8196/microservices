
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const JWT_KEY = process.env.JWT_KEY!;

export const currentUserHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.jwt) {
    try {
      const payload = jwt.verify(
        req.session.jwt,
        JWT_KEY
      ) as UserPayload;
      req.currentUser = payload;
    } catch (err) {}
  }

  next();
};

