export class CustomResponse {
  httpCode: number;
  message: string;

  constructor(httpCode: number, message: string) {
    this.httpCode = httpCode;
    this.message = message;
  }
}
