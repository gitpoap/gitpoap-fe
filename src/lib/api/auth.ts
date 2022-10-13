import { Tokens } from './types';
import { JsonRpcSigner } from '@ethersproject/providers';
import { makeAPIRequest, makeAPIRequestWithAuth, sign } from './utils';

export class AuthAPI {
  protected tokens: Tokens | null;

  constructor(tokens: Tokens | null) {
    this.tokens = tokens;
  }

  async authenticate(signer: JsonRpcSigner) {
    const timestamp = Date.now();
    const address = await signer.getAddress();

    const signatureString = await sign<string>(signer, timestamp, 'POST /auth', address);
    const res = await makeAPIRequest(
      '/auth',
      'POST',
      JSON.stringify({
        address,
        signature: {
          data: signatureString,
          createdAt: timestamp,
        },
      }),
    );

    if (!res) {
      return null;
    }

    const tokens: Tokens = await res.json();
    return tokens;
  }

  async refresh() {
    const res = await makeAPIRequest(
      '/auth/refresh',
      'POST',
      JSON.stringify({ token: this.tokens?.refreshToken }),
    );

    if (!res) {
      return null;
    }

    const tokens: Tokens = await res.json();
    return tokens;
  }

  async githubAuth(code: string) {
    const res = await makeAPIRequestWithAuth(
      '/auth/github',
      'POST',
      this.tokens?.accessToken ?? null,
      JSON.stringify({ code }),
    );
    if (!res) {
      return null;
    }

    const tokens: Tokens = await res.json();
    return tokens;
  }
}
