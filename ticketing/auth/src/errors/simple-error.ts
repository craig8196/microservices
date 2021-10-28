
import { ExternalError } from './external-error';
import { InternalError } from './internal-error';


export class SimpleError extends InternalError {
  constructor(msg: string, statusCode: number = 400) {
    super(msg, statusCode);
    Object.setPrototypeOf(this, SimpleError.prototype);
  }

  serializeErrors() {
    return [new ExternalError(this.message)];
  }
}

