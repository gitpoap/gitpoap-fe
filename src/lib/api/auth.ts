import { API, makeAPIRequest, makeAPIRequestWithAuth } from './utils';
import { SignatureType, Tokens } from '../../types';

export type AuthenticateResponse = {
  tokens: Tokens;
  signatureData: SignatureType;
};

export class AuthAPI extends API {
  protected refreshToken: string | null;

  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
    this.refreshToken = tokens?.refreshToken ?? null;
  }

  async authenticate(signatureData: SignatureType): Promise<AuthenticateResponse | null> {
    const res = await makeAPIRequest(
      '/auth',
      'POST',
      JSON.stringify({
        address: signatureData.address,
        signatureData: {
          signature: signatureData.signature,
          message: signatureData.message,
          createdAt: signatureData.createdAt,
        },
      }),
    );

    if (!res) {
      return null;
    }

    const tokens: Tokens = await res.json();
    return { tokens, signatureData };
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
