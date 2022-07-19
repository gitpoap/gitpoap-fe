import { showNotification } from '@mantine/notifications';
import { DateTime } from 'luxon';
import { GITPOAP_API_URL } from '../constants';
import { NotificationFactory } from '../notifications';

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
  image: File;
};

const makeGitPOAPAPIRequest = async (
  method: string,
  endpoint: string,
  body?: BodyInit,
  headers?: HeadersInit,
) => {
  try {
    const res = await fetch(`${GITPOAP_API_URL}${endpoint}`, {
      method,
      headers,
      body,
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res;
  } catch (err) {
    console.error(err);

    return null;
  }
};

export const createGitPOAP = async (values: GitPOAPCreateValues, accessToken: string) => {
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
  formData.append('image', values['image'] ?? '');

  const res = await makeGitPOAPAPIRequest('POST', '/gitpoaps', formData, {
    Authorization: `Bearer ${accessToken}`,
  });

  if (!res || !res.ok) {
    showNotification(
      NotificationFactory.createError(
        `Error - Request Failed for ${values.name}`,
        'Oops, something went wrong! 🤥',
      ),
    );

    return null;
  }
  showNotification(
    NotificationFactory.createSuccess(`Success - GitPOAP Created - ${values.name}`, 'Thanks! 🤓'),
  );

  return true;
};
