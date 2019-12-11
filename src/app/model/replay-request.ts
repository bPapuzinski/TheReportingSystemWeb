export class ReplayRequest {
  author: string;
  context: string;

  constructor(author: string, context: string) {
    this.author = author;
    this.context = context;
  }
}
