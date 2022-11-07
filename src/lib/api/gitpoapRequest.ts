import { DateTime } from 'luxon';
import { z } from 'zod';
import { Notifications } from '../../notifications';
import { API, Tokens, makeAPIRequestWithAuth } from './utils';

export const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const ImageFileSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    'File type must be one of image/jpeg, image/jpg, image/png, image/webp',
  );

export const GitPOAPRequestContributorsSchema = z
  .object({
    githubHandles: z.array(z.string()).optional(),
    ethAddresses: z.array(z.string()).optional(),
    ensNames: z.array(z.string()).optional(),
    emails: z.array(z.string().email()).optional(),
  })
  .strict();

export const GitPOAPRequestCreateSchema = z.object({
  projectId: z.number().optional(),
  organizationId: z.number().optional(),
  name: z.string().min(1),
  contributors: GitPOAPRequestContributorsSchema,
  description: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  expiryDate: z.date(),
  eventUrl: z.string().url().min(1),
  email: z.string().email({ message: 'Invalid email' }),
  numRequestedCodes: z.number(),
  ongoing: z.boolean(),
  city: z.string().optional(),
  country: z.string().optional(),
  isEnabled: z.boolean(),
  image: ImageFileSchema,
});

export type GitPOAPRequestCreateValues = z.infer<typeof GitPOAPRequestCreateSchema>;

export class GitPOAPRequestAPI extends API {
  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
  }

  async create(values: GitPOAPRequestCreateValues) {
    const formData = new FormData();

    values.projectId && formData.append('projectId', values.projectId.toString());
    values.organizationId && formData.append('organizationId', values.organizationId.toString());
    formData.append('name', values.name);
    formData.append('contributors', values.contributors.toString());
    formData.append('description', values.description);
    formData.append('startDate', DateTime.fromJSDate(values.startDate).toFormat('yyyy-MM-dd'));
    formData.append('endDate', DateTime.fromJSDate(values.endDate).toFormat('yyyy-MM-dd'));
    formData.append('expiryDate', DateTime.fromJSDate(values.expiryDate).toFormat('yyyy-MM-dd'));
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

    Notifications.success(`Success - Created GitPOAP Request - ${values.name}`);

    return true;
  }

  async approve(id: number) {
    const res = await makeAPIRequestWithAuth(`/gitpoaps/custom/approve/${id}`, 'PUT', this.token);

    if (!res || !res.ok) {
      Notifications.error(`Error - Request failed for Request ID: ${id}`);

      return null;
    }
    Notifications.success(`Success - Approved Request ID: ${id}`);

    return true;
  }

  async reject(id: number) {
    const res = await makeAPIRequestWithAuth(`/gitpoaps/custom/reject/${id}`, 'PUT', this.token);

    if (!res || !res.ok) {
      Notifications.error(`Error - Request failed for Request ID: ${id}`);

      return null;
    }
    Notifications.success(`Success - Rejected Request ID: ${id}`);

    return true;
  }
}
