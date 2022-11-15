import { API, Tokens, makeAPIRequestWithAuth, makeAPIRequestWithResponseWithAuth } from './utils';

export type EmailReturnType = {
  id: number;
  emailAddress: string;
  isValidated: boolean;
  tokenExpiresAt: Date;
} | null;

export type Status = 'VALID' | 'INVALID' | 'EXPIRED' | 'USED' | 'LOADING';

export class EmailAPI extends API {
  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
  }

  async add(emailAddress: string) {
    const res = await makeAPIRequestWithResponseWithAuth(
      '/email',
      'POST',
      this.token,
      JSON.stringify({ emailAddress }),
    );

    if (!res) {
      return null;
    }

    const data = (await res.json()) as { msg: string };
    return data;
  }

  async delete() {
    const res = await makeAPIRequestWithAuth('/email', 'DELETE', this.token);

    if (!res) {
      return null;
    }

    return true;
  }

  async get() {
    const res = await makeAPIRequestWithAuth('/email', 'GET', this.token);

    if (!res) {
      return null;
    }

    const email = (await res.json()) as { email: EmailReturnType };
    return email;
  }

  async verify(token: string) {
    const res = await makeAPIRequestWithResponseWithAuth(
      `/email/verify/${token}`,
      'POST',
      this.token,
    );

    if (!res) {
      return null;
    }

    const data = (await res.json()) as { msg: Status };
    return data;
  }
}
