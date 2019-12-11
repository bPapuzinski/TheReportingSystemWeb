export class RegisterRequest {
  username: string;
  password: string;
  email: string;
  mobileNumber: string;

  constructor(username: string, password: string, email: string, mobileNumber: string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.mobileNumber = mobileNumber;
  }
}
