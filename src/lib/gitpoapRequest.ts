import { showNotification } from '@mantine/notifications';
import { DateTime } from 'luxon';
import { GITPOAP_API_URL } from '../constants';
import { NotificationFactory } from '../notifications';

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

type GitPOAPRequestApproveValues = {
  numRequestedCodes: number;
};

const makeGitPOAPRequestAPIRequest = async (
  method: string,
  endpoint: string,
  headers?: HeadersInit,
  body?: BodyInit,
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

export const createGitPOAPRequest = async (
  values: GitPOAPRequestCreateValues,
  accessToken: string,
) => {
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

  const res = await makeGitPOAPRequestAPIRequest(
    'POST',
    '/gitpoaps/custom',
    {
      Authorization: `Bearer ${accessToken}`,
    },
    formData,
  );

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
    NotificationFactory.createSuccess(
      `Success - GitPOAPRequest Created - ${values.name}`,
      'Thanks! 🤓',
    ),
  );

  return true;
};

export const approveGitPOAPRequest = async (id: number, accessToken: string) => {
  const res = await makeGitPOAPRequestAPIRequest('PUT', `/gitpoaps/custom/approve/${id}`, {
    Authorization: `Bearer ${accessToken}`,
  });

  if (!res || !res.ok) {
    showNotification(
      NotificationFactory.createError(
        `Error - Request Failed for ${id}`,
        'Oops, something went wrong! 🤥',
      ),
    );

    return null;
  }
  showNotification(
    NotificationFactory.createSuccess(`Success - GitPOAPRequest Approved - ${id}`, 'Thanks! 🤓'),
  );

  return true;
};

export const rejectGitPOAPRequest = async (id: number, accessToken: string) => {
  const res = await makeGitPOAPRequestAPIRequest('PUT', `/gitpoaps/custom/reject/${id}`, {
    Authorization: `Bearer ${accessToken}`,
  });

  if (!res || !res.ok) {
    showNotification(
      NotificationFactory.createError(
        `Error - Request Failed for ${id}`,
        'Oops, something went wrong! 🤥',
      ),
    );

    return null;
  }
  showNotification(
    NotificationFactory.createSuccess(`Success - GitPOAPRequest Rejected - ${id}`, 'Thanks! 🤓'),
  );

  return true;
};
