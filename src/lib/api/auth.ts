import { JsonRpcSigner } from '@ethersproject/providers';
import {
  API,
  Tokens,
  makeAPIRequest,
  makeAPIRequestWithAuth,
  sign,
  generateSignatureData,
  SignatureData,
} from './utils';

export type AuthenticateResponse = {
  tokens: Tokens;
  signatureString: string;
  signatureData: SignatureData;
  address: string;
};

export type ExistingSignatureType = {
  signatureString: string;
  createdAt: number;
};

export class AuthAPI extends API {
  protected refreshToken: string | null;

  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
    this.refreshToken = tokens?.refreshToken ?? null;
  }

  async authenticate(signer: JsonRpcSigner): Promise<AuthenticateResponse | null> {
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
    return { tokens, signatureData, signatureString, address };
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
