import { z } from 'zod';
import { API, makeAPIRequestWithResponseWithAuth } from './utils';
import { Notifications } from '../../notifications';
import { Tokens } from '../../types';

export type CreateTeamFormValues = {
  name: string;
  description: string;
  image: File | null;
};

export const MAX_FILE_SIZE = 4000000;
export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/gif'];

const ImageFileSchema = z
  .any()
  .refine((file) => !file || file?.size <= MAX_FILE_SIZE, `Max file size is 4MB.`)
  .refine(
    (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
    'File type must be image/png or image/gif',
  );

export const CreateTeamFormValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(),
  image: ImageFileSchema,
});

export type CreateTeamResponse = {
  id: number;
};

export class TeamApi extends API {
  constructor(tokens: Tokens | null) {
    super(tokens?.accessToken);
  }

  async create(values: CreateTeamFormValues): Promise<CreateTeamResponse | null> {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('image', values.image ?? '');

    const res = await makeAPIRequestWithResponseWithAuth(
      '/teams',
      'POST',
      this.token,
      formData,
      {},
    );

    if (!res?.ok) {
      Notifications.error(`Error - Request Failed for ${values.name}`);

      return null;
    }

    Notifications.success(`Success - Created Team Request - ${values.name}`);

    let data = null;
    try {
      data = await res.json();
    } catch (err) {
      return null;
    }

    return data;
  }

  async addLogo(teamId: number, image: File) {
    const formData = new FormData();

    formData.append('image', image);

    const res = await makeAPIRequestWithResponseWithAuth(
      `/teams/${teamId}/logo`,
      'PATCH',
      this.token,
      formData,
      {},
    );

    if (!res?.ok) {
      return null;
    }

    return true;
  }
}
