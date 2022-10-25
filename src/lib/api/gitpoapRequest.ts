import { DateTime } from 'luxon';
import { Notifications } from '../../notifications';
import { API, Tokens, makeAPIRequestWithAuth } from './utils';

type GitPOAPRequestCreateValues = {
  projectId?: number;
  organizationId?: number;
  name: string;
  contributors: string;
  description: string;
  startDate: Date;
  endDate: Date;
  expiryDate: Date;
  year: number;
  eventUrl: string;
  email: string;
  numRequestedCodes: number;
  ongoing: boolean;
  city?: string;
  country?: string;
  isEnabled: boolean;
  image: File;
};

export class GitPOAPRequestAPI extends API {
  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
  }

  async create(values: GitPOAPRequestCreateValues) {
    const formData = new FormData();

    values.projectId && formData.append('projectId', values.projectId.toString());
    values.organizationId && formData.append('organizationId', values.organizationId.toString());
    formData.append('name', values.name);
    formData.append('contributors', values.contributors);
    formData.append('description', values.description);
    formData.append('startDate', DateTime.fromJSDate(values.startDate).toFormat('yyyy-MM-dd'));
    formData.append('endDate', DateTime.fromJSDate(values.endDate).toFormat('yyyy-MM-dd'));
    formData.append('expiryDate', DateTime.fromJSDate(values.expiryDate).toFormat('yyyy-MM-dd'));
    formData.append('year', values.year.toString());
    formData.append('eventUrl', values.eventUrl);
    formData.append('email', values.email);
    formData.append('numRequestedCodes', values.numRequestedCodes.toString());
    formData.append('ongoing', values.ongoing.toString());
    values.city && formData.append('city', values.city.toString());
    values.country && formData.append('country', values.country.toString());
    formData.append('isEnabled', values.isEnabled.toString());
    formData.append('image', values.image ?? '');

    const res = await makeAPIRequestWithAuth(
      '/gitpoaps/custom',
      'POST',
      this.token,
      JSON.stringify(formData),
    );

    if (!res || !res.ok) {
      Notifications.error(`Error - Request Failed for ${values.name}`);

      return null;
    }

    Notifications.success(`Success - GitPOAPRequest Created - ${values.name}`);

    return true;
  }

  async approve(id: number) {
    const res = await makeAPIRequestWithAuth(`/gitpoaps/custom/approve/${id}`, 'PUT', this.token);

    if (!res || !res.ok) {
      Notifications.error(`Error - Request Failed for ${id}`);

      return null;
    }
    Notifications.success(`Success - GitPOAPRequest Approved - ${id}`);

    return true;
  }

  async reject(id: number) {
    const res = await makeAPIRequestWithAuth(`/gitpoaps/custom/reject/${id}`, 'PUT', this.token);

    if (!res || !res.ok) {
      Notifications.error(`Error - Request Failed for ${id}`);

      return null;
    }
    Notifications.success(`Success - GitPOAPRequest Rejected - ${id}`);

    return true;
  }
}
