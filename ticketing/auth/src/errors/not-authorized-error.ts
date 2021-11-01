
import { ExternalError } from './external-error';
import { InternalError } from './internal-error';


export class NotAuthorizedError extends InternalError {
  constructor(msg: string) {
    super(msg, 401);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [new ExternalError(this.message)];
  }
}

