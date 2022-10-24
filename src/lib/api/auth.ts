import { JsonRpcSigner } from '@ethersproject/providers';
import {
  API,
  Tokens,
  makeAPIRequest,
  makeAPIRequestWithAuth,
  sign,
  generateSignatureData,
} from './utils';

export class AuthAPI extends API {
  protected refreshToken: string | null;

  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
    this.refreshToken = tokens?.refreshToken ?? null;
  }

  async authenticate(signer: JsonRpcSigner) {
    const address = await signer.getAddress();
    const signatureData = generateSignatureData(address);
    const signatureString = await sign(signer, signatureData.message);

    if (!signatureString) {
      return null;
    }

    const res = await makeAPIRequest(
      '/auth',
      'POST',
      JSON.stringify({
        address,
        signatureData: {
          signature: signatureString,
          message: signatureData.message,
          createdAt: signatureData.createdAt,
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
      '/github',
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
    const res = await makeAPIRequestWithAuth('/github', 'DELETE', this.token);
    if (!res) {
      return null;
    }

    const tokens: Tokens = await res.json();
    return tokens;
  }
}
