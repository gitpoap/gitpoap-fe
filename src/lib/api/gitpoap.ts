import { DateTime } from 'luxon';
import { Notifications } from '../../notifications';
import { API, Tokens, makeAPIRequestWithAuth } from './utils';

type GitPOAPCreateValues = {
  project: { githubRepoIds: number[] } | { projectId: number };
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  expiryDate: Date;
  year: number;
  eventUrl: string;
  email: string;
  numRequestedCodes: number;
  isOngoing: boolean;
  isEnabled: boolean;
  isPRBased: boolean;
  image: File;
};

export type GitPOAPCreateClaimsValues = {
  gitPOAPId: number;
  contributors: {
    githubHandles?: string[];
    ensNames?: string[];
    emails?: string[];
    ethAddresses?: string[];
  };
};

export class GitPOAPAPI extends API {
  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
  }

  async create(values: GitPOAPCreateValues) {
    const formData = new FormData();

    const isOngoing = values['isOngoing'].toString();

    formData.append('project', JSON.stringify(values.project));
    formData.append('name', values.name);
    formData.append('description', values['description']);
    formData.append('startDate', DateTime.fromJSDate(values['startDate']).toFormat('yyyy-MM-dd'));
    formData.append('endDate', DateTime.fromJSDate(values['endDate']).toFormat('yyyy-MM-dd'));
    formData.append('expiryDate', DateTime.fromJSDate(values['expiryDate']).toFormat('yyyy-MM-dd'));
    formData.append('year', values['year'].toString());
    formData.append('eventUrl', values['eventUrl']);
    formData.append('email', values['email']);
    formData.append('numRequestedCodes', values['numRequestedCodes'].toString());
    formData.append('isOngoing', isOngoing);
    formData.append('canRequestMoreCodes', isOngoing);
    formData.append('isEnabled', values['isEnabled'].toString());
    formData.append('isPRBased', values['isPRBased'].toString());
    formData.append('image', values['image'] ?? '');

    const res = await makeAPIRequestWithAuth('/gitpoaps', 'POST', this.token, formData, {});

    if (!res) {
      Notifications.error(`Error - Request Failed for ${values.name}`);

      return null;
    }

    Notifications.success(`Success - GitPOAP Created - ${values.name}`);

    return true;
  }

  async removeContributor(claimId: number) {
    const res = await makeAPIRequestWithAuth(`/claims/${claimId}}`, 'DELETE', this.token);

    if (!res) {
      Notifications.error('Failed to remove contributor');

      return null;
    }

    Notifications.success('Contributor removed');

    return true;
  }

  async addContributors(values: GitPOAPCreateClaimsValues) {
    const { gitPOAPId, contributors } = values;

    const res = await makeAPIRequestWithAuth(
      `/gitpoaps/${gitPOAPId}/claims`,
      'PUT',
      this.token,
      JSON.stringify({ contributors }),
    );

    if (!res) {
      Notifications.error('Failed to add contributors');

      return null;
    }

    Notifications.success('Contributors added');

    return true;
  }
}
