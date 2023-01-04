import { API, makeAPIRequestWithResponseWithAuth } from './utils';
import { Tokens } from '../../types';

export class TeamApi extends API {
  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
  }

  async addLogo(teamId: number, image: File) {
    const formData = new FormData();

    formData.append('image', image);

    const res = await makeAPIRequestWithResponseWithAuth(
      `/teams/${teamId}/logo`,
      'PATCH',
      this.token,
      formData,
      {},
    );

    if (!res) {
      return null;
    }

    const data = (await res.json()) as { msg: string };
    return data;
  }
}
