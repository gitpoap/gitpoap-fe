import { AuthAPI } from './auth';
import { GitPOAPAPI } from './gitpoap';
import { Tokens } from './utils';
export class APIClient {
  public auth: AuthAPI;
  public gitpoap: GitPOAPAPI;

  constructor(tokens: Tokens | null) {
    this.auth = new AuthAPI(tokens);
    this.gitpoap = new GitPOAPAPI(tokens);
  }
}
