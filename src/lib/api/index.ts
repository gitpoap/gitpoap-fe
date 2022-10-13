import { AuthAPI } from './auth';
import { Tokens } from './types';

export class APIClient {
  public auth: AuthAPI;

  constructor(tokens: Tokens | null) {
    this.auth = new AuthAPI(tokens);
  }
}
