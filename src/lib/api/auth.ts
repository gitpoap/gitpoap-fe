import { JsonRpcSigner } from '@ethersproject/providers';
import { API, Tokens, makeAPIRequest, makeAPIRequestWithAuth, sign } from './utils';

export class AuthAPI extends API {
  protected refreshToken: string | null;

  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
    this.refreshToken = tokens?.refreshToken ?? null;
  }

  async authenticate(signer: JsonRpcSigner) {
    const timestamp = Date.now();
    const address = await signer.getAddress();

    const signatureString = await sign<string>(signer, timestamp, 'POST /auth', address);

    if (!signatureString) {
      return null;
    }

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
      '/auth/github',
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
}
