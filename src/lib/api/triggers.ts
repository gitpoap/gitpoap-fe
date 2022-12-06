import { Notifications } from '../../notifications';
import { API, makeAPIRequestWithAuth } from './utils';
import { Tokens } from '../../types';

export class TriggersAPI extends API {
  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
  }

  async checkForCodes() {
    const res = await makeAPIRequestWithAuth('/triggers/check-for-codes', 'POST', this.token);
    if (!res) {
      Notifications.error(`Checked for codes failed`);
      return null;
    }

    Notifications.success(`Checked for codes successfully`);
    return true;
  }
}
