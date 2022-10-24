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
  ongoing: boolean;
  isEnabled: boolean;
  isPRBased: boolean;
  image: File;
};

export class GitPOAPAPI extends API {
  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
  }

  async create(values: GitPOAPCreateValues) {
    const formData = new FormData();

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
    formData.append('ongoing', values['ongoing'].toString());
    formData.append('isEnabled', values['isEnabled'].toString());
    formData.append('isPRBased', values['isPRBased'].toString());
    formData.append('image', values['image'] ?? '');

    const res = await makeAPIRequestWithAuth(
      '/gitpoaps',
      'POST',
      this.token,
      JSON.stringify(formData),
    );

    if (!res) {
      Notifications.error(`Error - Request Failed for ${values.name}`);

      return null;
    }

    Notifications.success(`Success - GitPOAP Created - ${values.name}`, 'Thanks! 🤓');

    return true;
  }
}
