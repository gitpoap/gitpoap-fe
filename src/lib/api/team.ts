import { z } from 'zod';
import { utils } from 'ethers';
import { API, makeAPIRequestWithResponseWithAuth } from './utils';
import { Notifications } from '../../notifications';
import { Tokens } from '../../types';

export type CreateTeamFormValues = {
  name: string;
  description: string;
  addresses: string[];
  image: File | null;
};

export const MAX_FILE_SIZE = 4000000;
export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/gif'];

const isAddress = (address: string) => utils.isAddress(address);

const ImageFileSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 4MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    'File type must be image/png or image/gif',
  );

export const CreateTeamFormValidationSchema = () =>
  z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().optional(),
    addresses: z
      .array(z.string().refine(isAddress, (val) => ({ message: `${val} is not a valid address` })))
      .optional(),
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
    formData.append('addresses', JSON.stringify(values.addresses));
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

    const data = await res.json();
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

    if (!res) {
      return null;
    }

    const data = (await res.json()) as { msg: string };
    return data;
  }
}
