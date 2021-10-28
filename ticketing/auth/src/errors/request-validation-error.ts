
import { ValidationError } from 'express-validator';

import { ExternalError } from './external-error';
import { InternalError } from './internal-error';


export class RequestValidationError extends InternalError {

  constructor(private validationErrors: ValidationError[]) {
    super('Invalid request parameters', 400);
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): ExternalError[] {
    return this.validationErrors.map(err => {
      return new ExternalError(err.msg, err.param);
    });
  }
}

