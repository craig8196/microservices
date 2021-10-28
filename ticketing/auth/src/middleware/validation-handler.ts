import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { ExternalError } from '../errors/external-error';
import { InternalError } from '../errors/internal-error';
import { RequestValidationError } from '../errors/request-validation-error';


const validationHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};

export { validationHandler };

