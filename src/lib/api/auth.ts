import { API, makeAPIRequest, makeAPIRequestWithAuth } from './utils';
import { Tokens } from '../../types';

export type AuthenticateResponse = {
  tokens: Tokens;
};

export class AuthAPI extends API {
  protected refreshToken: string | null;

  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
    this.refreshToken = tokens?.refreshToken ?? null;
  }

  async authenticate(privyToken: string): Promise<AuthenticateResponse | null> {
    const res = await makeAPIRequest(
      '/auth',
      'POST',
      JSON.stringify({
        privyToken,
      }),
    );

    if (!res) {
      return null;
    }

    const tokens: Tokens = await res.json();
    return { tokens };
  }

  async refresh() {
    const res = await makeAPIRequest(
      '/auth/refresh',
      'POST',
      JSON.stringify({ token: this.refreshToken }),
    );

    if (!res) {
      return null;
    }

    const tokens: Tokens = await res.json();

    return tokens;
  }

  async githubAuth(code: string) {
    const res = await makeAPIRequestWithAuth(
      '/oauth/github',
      'POST',
      this.token,
      JSON.stringify({ code }),
    );
    if (!res) {
      return null;
    }

    const tokens: Tokens = await res.json();
    return tokens;
  }

  async githubDisconnect() {
    const res = await makeAPIRequestWithAuth('/oauth/github', 'DELETE', this.token);
    if (!res) {
      return null;
    }

    const tokens: Tokens = await res.json();
    return tokens;
  }

  async discordAuth(code: string) {
    const res = await makeAPIRequestWithAuth(
      '/oauth/discord',
      'POST',
      this.token,
      JSON.stringify({ code }),
    );
    if (!res) {
      return null;
    }

    const tokens: Tokens = await res.json();
    return tokens;
  }

  async discordDisconnect() {
    const res = await makeAPIRequestWithAuth('/oauth/discord', 'DELETE', this.token);
    if (!res) {
      return null;
    }

    const tokens: Tokens = await res.json();
    return tokens;
  }
}
