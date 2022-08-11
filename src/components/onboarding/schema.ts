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

const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const ImageFileSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    '.jpg, .jpeg, .png and .webp files are accepted.',
  );

export const createSchema = (stage: number, shouldGitPOAPDesign: boolean) => {
  switch (stage) {
    case 0:
      return z.object({
        repos: z.array(repoSchema).min(1, { message: 'Select at least once repo' }),
      });
    case 1:
      const design = z.object({
        shouldGitPOAPDesign: z.string(),
        isOneGitPOAPPerRepo: z.string(),
      });
      const images = z.object({
        images: z.array(ImageFileSchema).min(1, { message: 'Upload at least one image' }),
      });
      // We only validate the images if the user has chosen to upload their own
      // This method allows the images to be perserved if the user switches between the options
      return shouldGitPOAPDesign ? design : design.merge(images);
    case 2:
      return z.object({
        name: z.string(),
        email: z
          .string()
          .email({ message: 'Invalid email' })
          .min(1, { message: 'Email is required' }),
        notes: z.string(),
      });
  }
};
