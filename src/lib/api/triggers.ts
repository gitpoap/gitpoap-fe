import { API, Tokens, makeAPIRequestWithAuth } from './utils';

export class TriggersAPI extends API {
  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
  }

  async checkForCodes() {
    const res = await makeAPIRequestWithAuth('/triggers/check-for-codes', 'GET', this.token);

    if (!res) {
      return null;
    }

    return true;
  }
}
