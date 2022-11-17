import { DateTime } from 'luxon';
import { z } from 'zod';
import { Notifications } from '../../notifications';
import { API, Tokens, makeAPIRequestWithAuth } from './utils';

export const MAX_FILE_SIZE = 4000000;
export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/gif'];

const ImageFileSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 4MB.`)
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
  creatorEmail: z.string().email({ message: 'Invalid email' }),
  contributors: GitPOAPRequestContributorsSchema,
  image: ImageFileSchema,
});

export type GitPOAPRequestCreateValues = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  creatorEmail: string;
  contributors: GitPOAPRequestContributorsValues;
  image: File | null;
};

export const GitPOAPRequestEditSchema = (hasRemovedSavedImage: boolean) =>
  z.object({
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
    image: hasRemovedSavedImage ? ImageFileSchema : z.null(),
  });

export type GitPOAPRequestEditValues = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  contributors: GitPOAPRequestContributorsValues;
  image: File | null;
};

export class GitPOAPRequestAPI extends API {
  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
  }

  async create(values: z.infer<typeof GitPOAPRequestCreateSchema>) {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('startDate', DateTime.fromJSDate(values.startDate).toFormat('yyyy-MM-dd'));
    formData.append('endDate', DateTime.fromJSDate(values.endDate).toFormat('yyyy-MM-dd'));
    formData.append('creatorEmail', values.creatorEmail);
    formData.append('contributors', JSON.stringify(values.contributors));
    formData.append('image', values.image ?? '');

    const res = await makeAPIRequestWithAuth('/gitpoaps/custom', 'POST', this.token, formData, {});

    if (!res?.ok) {
      Notifications.error(`Error - Request Failed for ${values.name}`);

      return null;
    }

    Notifications.success(`Success - Created GitPOAP Request - ${values.name}`);

    return true;
  }

  async patch(gitPOAPRequestId: number, values: GitPOAPRequestEditValues) {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('startDate', DateTime.fromJSDate(values.startDate).toFormat('yyyy-MM-dd'));
    formData.append('endDate', DateTime.fromJSDate(values.endDate).toFormat('yyyy-MM-dd'));
    formData.append('contributors', JSON.stringify(values.contributors));
    values.image && formData.append('image', values.image);

    const res = await makeAPIRequestWithAuth(
      `/gitpoaps/custom/${gitPOAPRequestId}`,
      'PATCH',
      this.token,
      formData,
      {},
    );

    if (!res?.ok) {
      Notifications.error(`Error - Request Failed for ${values.name}`);

      return null;
    }

    Notifications.success(`Success - Created GitPOAP Request - ${values.name}`);

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
