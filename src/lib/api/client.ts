import { Tokens } from '../../types';
import { AuthAPI } from './auth';
import { EmailAPI } from './email';
import { GitPOAPAPI } from './gitpoap';
import { GitPOAPRequestAPI } from './gitpoapRequest';
import { TeamApi } from './team';
import { TriggersAPI } from './triggers';

export class APIClient {
  public auth: AuthAPI;
  public email: EmailAPI;
  public gitpoap: GitPOAPAPI;
  public gitPOAPRequest: GitPOAPRequestAPI;
  public team: TeamApi;
  public triggers: TriggersAPI;

  constructor(tokens: Tokens | null) {
    this.auth = new AuthAPI(tokens);
    this.email = new EmailAPI(tokens);
    this.gitpoap = new GitPOAPAPI(tokens);
    this.gitPOAPRequest = new GitPOAPRequestAPI(tokens);
    this.team = new TeamApi(tokens);
    this.triggers = new TriggersAPI(tokens);
  }
}
