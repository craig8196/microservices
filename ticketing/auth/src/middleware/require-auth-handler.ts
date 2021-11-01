
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';


export const requireAuthHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser) {
    return next();
  }
  
  throw new NotAuthorizedError('Not authorized');
};

