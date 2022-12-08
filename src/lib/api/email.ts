import { isTokens } from '../../hooks/useTokens';
import {
  API,
  makeAPIRequestWithAuth,
  makeAPIRequestWithResponseWithAuth,
  makeAPIRequestWithResponse,
} from './utils';
import { Tokens } from '../../types';

export type EmailReturnType = {
  id: number;
  emailAddress: string;
  isValidated: boolean;
  tokenExpiresAt: Date;
} | null;

export type Status = 'VALID' | 'INVALID' | 'EXPIRED' | 'USED' | 'LOADING';

type DeleteEmailResponse = { msg: string; tokens: Tokens };

export const isDeleteEmailResponse = (res: unknown): res is DeleteEmailResponse => {
  return (
    typeof res === 'object' &&
    res !== null &&
    'msg' in res &&
    'tokens' in res &&
    isTokens((res as DeleteEmailResponse).tokens)
  );
};

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

  async delete(): Promise<DeleteEmailResponse | null> {
    const res = await makeAPIRequestWithAuth('/email', 'DELETE', this.token);

    if (!res) {
      return null;
    }

    const data = await res.json();
    if (!isDeleteEmailResponse(data)) {
      return null;
    }

    return data;
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
    const res = await makeAPIRequestWithResponse(`/email/verify/${token}`, 'POST');

    if (!res) {
      return null;
    }

    const data = (await res.json()) as { msg: Status };
    return data;
  }
}
