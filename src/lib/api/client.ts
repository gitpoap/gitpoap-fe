import { AuthAPI } from './auth';
import { EmailAPI } from './email';
import { GitPOAPAPI } from './gitpoap';
import { GitPOAPRequestAPI } from './gitpoapRequest';
import { Tokens } from '../../types';
import { TriggersAPI } from './triggers';

export class APIClient {
  public auth: AuthAPI;
  public gitpoap: GitPOAPAPI;
  public email: EmailAPI;
  public gitPOAPRequest: GitPOAPRequestAPI;
  public triggers: TriggersAPI;

  constructor(tokens: Tokens | null) {
    this.auth = new AuthAPI(tokens);
    this.gitpoap = new GitPOAPAPI(tokens);
    this.email = new EmailAPI(tokens);
    this.gitPOAPRequest = new GitPOAPRequestAPI(tokens);
    this.triggers = new TriggersAPI(tokens);
  }
}
