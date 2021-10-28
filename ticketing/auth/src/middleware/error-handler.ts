import { Request, Response, NextFunction } from 'express';

import { ExternalError } from '../errors/external-error';
import { InternalError } from '../errors/internal-error';


export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof InternalError) {
    if (err.shouldLog) {
      console.log(err.message);
    }
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  else {
    console.log('An unhandled error has occurred, notify development: ' + err.message);

    return res.status(500).send({
      errors: new ExternalError('An internal error occurred.')
    });
  }
};

