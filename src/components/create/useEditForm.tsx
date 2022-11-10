import { useForm, zodResolver } from '@mantine/form';
import { GitPOAPRequestEditSchema, GitPOAPRequestEditValues } from '../../lib/api/gitpoapRequest';

export const useEditForm = (initialValues: GitPOAPRequestEditValues) =>
  useForm<GitPOAPRequestEditValues>({
    validate: zodResolver(GitPOAPRequestEditSchema),
    // Setting image to {} instead of null allows us to detect if it's been cleared
    initialValues: { ...initialValues, image: {} },
  });

export type EditFormReturnTypes = ReturnType<typeof useEditForm>;
