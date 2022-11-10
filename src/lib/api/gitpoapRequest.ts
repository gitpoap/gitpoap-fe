import { DateTime } from 'luxon';
import { z } from 'zod';
import { Notifications } from '../../notifications';
import { API, Tokens, makeAPIRequestWithAuth } from './utils';

export const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/gif'];

const ImageFileSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    'File type must be image/png or image/gif',
  );

export const GitPOAPRequestContributorsSchema = z
  .object({
    githubHandles: z.array(z.string()).optional(),
    ethAddresses: z.array(z.string()).optional(),
    ensNames: z.array(z.string()).optional(),
    emails: z.array(z.string().email()).optional(),
  })
  .strict();

export type GitPOAPRequestContributorsValues = z.infer<typeof GitPOAPRequestContributorsSchema>;

export const GitPOAPRequestCreateSchema = z.object({
  projectId: z.number().optional(),
  organizationId: z.number().optional(),
  name: z.string().min(1, { message: 'Name is required' }),
  contributors: GitPOAPRequestContributorsSchema,
  description: z.string().min(1, { message: 'Description is required' }),
  startDate: z.date({
    required_error: 'Start date is required',
    invalid_type_error: 'Start date is required',
  }),
  endDate: z.date({
    required_error: 'End date is required',
    invalid_type_error: 'End date is required',
  }),
  creatorEmail: z.string().email({ message: 'Invalid email' }),
  ongoing: z.boolean(),
  isEnabled: z.boolean(),
  image: ImageFileSchema,
});

export type GitPOAPRequestCreateValues = z.infer<typeof GitPOAPRequestCreateSchema>;

export const GitPOAPRequestEditSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  startDate: z.date({
    required_error: 'Start date is required',
    invalid_type_error: 'Start date is required',
  }),
  endDate: z.date({
    required_error: 'End date is required',
    invalid_type_error: 'End date is required',
  }),
  contributors: GitPOAPRequestContributorsSchema,
});

export type GitPOAPRequestEditValues = z.infer<typeof GitPOAPRequestEditSchema>;

export class GitPOAPRequestAPI extends API {
  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
  }

  async create(values: GitPOAPRequestCreateValues) {
    const formData = new FormData();

    values.projectId && formData.append('projectId', values.projectId.toString());
    values.organizationId && formData.append('organizationId', values.organizationId.toString());
    formData.append('name', values.name);
    formData.append('contributors', JSON.stringify(values.contributors));
    formData.append('description', values.description);
    formData.append('startDate', DateTime.fromJSDate(values.startDate).toFormat('yyyy-MM-dd'));
    formData.append('endDate', DateTime.fromJSDate(values.endDate).toFormat('yyyy-MM-dd'));
    formData.append('creatorEmail', values.creatorEmail);
    formData.append('ongoing', values.ongoing.toString());
    formData.append('isEnabled', values.isEnabled.toString());
    formData.append('image', values.image ?? '');

    const res = await makeAPIRequestWithAuth('/gitpoaps/custom', 'POST', this.token, formData, {});

    if (!res?.ok) {
      Notifications.error(`Error - Request Failed for ${values.name}`);

      return null;
    }

    Notifications.success(`Success - Created GitPOAP Request - ${values.name}`);

    return true;
  }

  async patch(gitPOAPRequestId: number, data: GitPOAPRequestEditValues) {
    const res = await makeAPIRequestWithAuth(
      `/gitpoaps/custom/${gitPOAPRequestId}`,
      'PATCH',
      this.token,
      JSON.stringify({
        data,
      }),
    );

    if (!res?.ok) {
      Notifications.error(`Error - Request Failed for ${data.name}`);

      return null;
    }

    Notifications.success(`Success - Created GitPOAP Request - ${data.name}`);

    return true;
  }

  async approve(id: number) {
    const res = await makeAPIRequestWithAuth(`/gitpoaps/custom/approve/${id}`, 'PUT', this.token);

    if (!res?.ok) {
      Notifications.error(`Error - Request failed for Request ID: ${id}`);

      return null;
    }
    Notifications.success(`Success - Approved Request ID: ${id}`);

    return true;
  }

  async reject(id: number) {
    const res = await makeAPIRequestWithAuth(`/gitpoaps/custom/reject/${id}`, 'PUT', this.token);

    if (!res?.ok) {
      Notifications.error(`Error - Request failed for Request ID: ${id}`);

      return null;
    }
    Notifications.success(`Success - Rejected Request ID: ${id}`);

    return true;
  }
}
