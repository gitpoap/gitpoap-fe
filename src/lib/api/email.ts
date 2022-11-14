import { API, Tokens, makeAPIRequestWithAuth, makeAPIRequest } from './utils';

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

  async post(emailAddress: string) {
    const res = await makeAPIRequestWithAuth(
      '/email',
      'POST',
      this.token,
      JSON.stringify({ emailAddress }),
    );

    if (!res) {
      return null;
    }

    return true;
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
    const res = await makeAPIRequest(`/email/verify/${token}`, 'POST');

    if (!res) {
      return null;
    }

    const data = (await res.json()) as { msg: Status };
    return data;
  }
}
