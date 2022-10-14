import { AuthAPI } from './auth';
import { GitPOAPAPI } from './gitpoap';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type Methods = 'POST /auth';

export class API {
  protected token: string | null;

  constructor(token?: string | null) {
    this.token = token ?? null;
  }
}

export class APIClient {
  public auth: AuthAPI;
  public gitpoap: GitPOAPAPI;

  constructor(tokens: Tokens | null) {
    this.auth = new AuthAPI(tokens);
    this.gitpoap = new GitPOAPAPI(tokens);
  }
}
