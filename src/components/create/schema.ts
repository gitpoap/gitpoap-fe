import { z } from 'zod';

export const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const ImageFileSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    'File type must be one of image/jpeg, image/jpg, image/png, image/webp',
  );

export const createSchema = z.object({
  image: ImageFileSchema,
  name: z.string(),
  description: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  contributors: z.array(z.string()).min(1, { message: 'Select at least one contributor' }),
});

export const defaultInitialValues = {
  image: null,
  name: '',
  description: '',
  startDate: new Date(),
  endDate: null,
  contributors: [],
};
