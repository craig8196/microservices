
export class ExternalError {
  field: string;

  constructor(public message: string, field: string = '') {
    this.field = field;
  }
}

