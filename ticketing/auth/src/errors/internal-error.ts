
import { ExternalError } from './external-error';

export abstract class InternalError extends Error {

  statusCode: number;
  shouldLog: boolean = true;

  constructor(msg: string, statusCode: number = 400) {
    super(msg);

    this.statusCode = statusCode;

    Object.setPrototypeOf(this, InternalError.prototype);
  }

  abstract serializeErrors(): ExternalError[];
}

