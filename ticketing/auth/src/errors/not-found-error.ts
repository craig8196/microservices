
import { ExternalError } from './external-error';
import { InternalError } from './internal-error';


export class NotFoundError extends InternalError {
  constructor() {
    super('Route not found.', 400);

    // Do not flood our logs with this
    this.shouldLog = false;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [new ExternalError(this.message)];
  }
}

