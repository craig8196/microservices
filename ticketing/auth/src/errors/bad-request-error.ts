
import { SimpleError } from './simple-error';


export class BadRequestError extends SimpleError {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

