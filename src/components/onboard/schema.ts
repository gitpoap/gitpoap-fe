import { z } from 'zod';

const repoSchema = z.object({
  full_name: z.string(),
  githubRepoId: z.number(),
  permissions: z.object({
    admin: z.boolean(),
    maintain: z.boolean(),
    push: z.boolean(),
    triage: z.boolean(),
    pull: z.boolean(),
  }),
});

export const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const ImageFileSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    'File type must be one of image/jpeg, image/jpg, image/png, image/webp',
  );

export const createSchema = (stage: number) => {
  switch (stage) {
    case 0:
      return z.object({
        repos: z.array(repoSchema).min(1, { message: 'Select at least once repo' }),
      });
    case 1:
      return z.object({
        shouldGitPOAPDesign: z.string(),
        isOneGitPOAPPerRepo: z.string(),
        images: z.array(ImageFileSchema),
        notes: z.string(),
      });
    case 2:
      return z.object({
        name: z.string(),
        email: z
          .string()
          .email({ message: 'Invalid email' })
          .min(1, { message: 'Email is required' }),
      });
  }
};
