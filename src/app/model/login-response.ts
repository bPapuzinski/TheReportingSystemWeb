export class LoginResponse {
  httpCode: number;
  message: string;
  userId: number;
  username: string;

  constructor(httpCode: number, message: string, userId: number, username: string) {
    this.httpCode = httpCode;
    this.message = message;
    this.userId = userId;
    this.username = username;
  }
}
