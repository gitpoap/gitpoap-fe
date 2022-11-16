import { validate } from 'email-validator';
import { isAddress } from 'ethers/lib/utils';
import { DateTime } from 'luxon';
import { z } from 'zod';
import { isValidGithubHandleWithout0x } from '../../helpers';
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

export const ContributorsObjectSchema = z
  .object({
    githubHandles: z.array(z.string()).optional(),
    ethAddresses: z.array(z.string()).optional(),
    ensNames: z.array(z.string()).optional(),
    emails: z.array(z.string().email()).optional(),
  })
  .strict();
export type ContributorsObjectValues = z.infer<typeof ContributorsObjectSchema>;

type ContributorTypeValues = 'githubHandles' | 'ethAddresses' | 'ensNames' | 'emails' | 'invalid';

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
export type UnvalidatedContributor = { type: ContributorTypeValues; value: string };

export const CreateValidationSchema = z.object({
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
  contributors: z.array(ValidatedContributorSchema),
  image: ImageFileSchema,
});
export type ValidatedCreateValues = z.infer<typeof CreateValidationSchema>;

const CreateSubmissionSchema = CreateValidationSchema.merge(
  z.object({ contributors: ContributorsObjectSchema }),
);
type SubmittedCreateValues = z.infer<typeof CreateSubmissionSchema>;

export type CreateFormValues = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  creatorEmail: string;
  contributors: UnvalidatedContributor[];
  image: File | null;
};

export const EditValidationSchema = (hasRemovedSavedImage: boolean) =>
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
    contributors: z.array(ValidatedContributorSchema),
    image: hasRemovedSavedImage ? ImageFileSchema : z.null(),
  });
export type ValidatedEditValues = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  contributors: ValidatedContributor[];
  image: File | null;
};

const EditSubmissionSchema = z.object({
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
export type SubmittedEditValues = z.infer<typeof EditSubmissionSchema>;

export type EditFormInitialValues = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  contributors: ContributorsObjectValues;
  image: File | null;
};

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

  async create(values: SubmittedCreateValues) {
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

  async patch(gitPOAPRequestId: number, values: SubmittedEditValues) {
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
