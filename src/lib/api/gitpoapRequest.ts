import { validate } from 'email-validator';
import { isAddress } from 'ethers/lib/utils';
import { DateTime } from 'luxon';
import { z } from 'zod';
import { isValidGithubHandleWithout0x } from '../../helpers';
import { Notifications } from '../../notifications';
import { API, makeAPIRequestWithAuth } from './utils';
import { Tokens } from '../../types';

export const MAX_FILE_SIZE = 4000000;
export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/gif'];

const ImageFileSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 4MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    'File type must be image/png or image/gif',
  );

export const ContributorsObjectSchema = z
  .object({
    githubHandles: z.array(z.string()).optional(),
    ethAddresses: z.array(z.string()).optional(),
    ensNames: z.array(z.string()).optional(),
    emails: z.array(z.string().email()).optional(),
  })
  .strict();
export type ContributorsObject = z.infer<typeof ContributorsObjectSchema>;

type ContributorType = 'githubHandles' | 'ethAddresses' | 'ensNames' | 'emails' | 'invalid';

export const ValidatedContributorSchema = z.union([
  z.object({
    type: z.literal('githubHandles'),
    value: z
      .string()
      .trim()
      .min(1)
      .refine((v) => isValidGithubHandleWithout0x(v)),
  }),
  z.object({
    type: z.literal('ethAddresses'),
    value: z
      .string()
      .trim()
      .min(1)
      .refine((v) => isAddress(v)),
  }),
  z.object({
    type: z.literal('ensNames'),
    value: z
      .string()
      .trim()
      .min(1)
      .refine((v) => v.length > 4 && v.endsWith('.eth')),
  }),
  z.object({
    type: z.literal('emails'),
    value: z
      .string()
      .trim()
      .min(1)
      .refine((v) => validate(v)),
  }),
]);
export type ValidatedContributor = z.infer<typeof ValidatedContributorSchema>;
export type UnvalidatedContributor = { type: ContributorType; value: string };

export const CreateFormValidationSchema = z.object({
  name: z.string().min(10, { message: 'Name is required' }),
  description: z.string().min(15, { message: 'Description is required' }),
  startDate: z.date({
    required_error: 'Start date is required',
    invalid_type_error: 'Start date is required',
  }),
  endDate: z.date({
    required_error: 'End date is required',
    invalid_type_error: 'End date is required',
  }),
  creatorEmail: z.string().email({ message: 'Invalid email' }),
  contributors: z.array(ValidatedContributorSchema),
  image: ImageFileSchema,
});
export type ValidatedCreateFormValues = z.infer<typeof CreateFormValidationSchema>;

const CreateSubmissionSchema = CreateFormValidationSchema.merge(
  z.object({ contributors: ContributorsObjectSchema }),
);
type SubmittedCreateFormValues = z.infer<typeof CreateSubmissionSchema>;

export type CreateFormValues = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  creatorEmail: string;
  contributors: UnvalidatedContributor[];
  image: File | null;
};

export const EditFormValidationSchema = (hasRemovedSavedImage: boolean) =>
  z.object({
    name: z.string().min(10, { message: 'Name is required' }),
    description: z.string().min(15, { message: 'Description is required' }),
    startDate: z.date({
      required_error: 'Start date is required',
      invalid_type_error: 'Start date is required',
    }),
    endDate: z.date({
      required_error: 'End date is required',
      invalid_type_error: 'End date is required',
    }),
    contributors: z.array(ValidatedContributorSchema),
    image: hasRemovedSavedImage ? ImageFileSchema : z.null(),
  });
export type ValidatedEditFormValues = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  contributors: ValidatedContributor[];
  image: File | null;
};

const EditFormSubmissionSchema = z.object({
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
  contributors: ContributorsObjectSchema,
  image: ImageFileSchema.nullable(),
});
export type SubmittedEditFormValues = z.infer<typeof EditFormSubmissionSchema>;

export type EditFormValues = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  contributors: UnvalidatedContributor[];
  image: File | null;
};

export class GitPOAPRequestAPI extends API {
  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
  }

  async create(values: SubmittedCreateFormValues, teamId?: number) {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('startDate', DateTime.fromJSDate(values.startDate).toFormat('yyyy-MM-dd'));
    formData.append('endDate', DateTime.fromJSDate(values.endDate).toFormat('yyyy-MM-dd'));
    formData.append('creatorEmail', values.creatorEmail);
    formData.append('contributors', JSON.stringify(values.contributors));
    teamId && formData.append('teamId', teamId.toString());
    formData.append('image', values.image ?? '');

    const res = await makeAPIRequestWithAuth('/gitpoaps/custom', 'POST', this.token, formData, {});

    if (!res?.ok) {
      Notifications.error(`Error - Request Failed for ${values.name}`);

      return null;
    }

    Notifications.success(`Success - Created GitPOAP Request - ${values.name}`);

    return true;
  }

  async patch(gitPOAPRequestId: number, values: SubmittedEditFormValues) {
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

  async reject(id: number, rejectionReason: string) {
    const res = await makeAPIRequestWithAuth(
      `/gitpoaps/custom/reject/${id}`,
      'PUT',
      this.token,
      JSON.stringify({ rejectionReason }),
    );

    if (!res?.ok) {
      Notifications.error(`Error - Request failed for Request ID: ${id}`);

      return null;
    }
    Notifications.success(`Success - Rejected Request ID: ${id}`);

    return true;
  }
}
