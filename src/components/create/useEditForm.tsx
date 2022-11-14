import { useForm, zodResolver } from '@mantine/form';
import { GitPOAPRequestEditSchema, GitPOAPRequestEditValues } from '../../lib/api/gitpoapRequest';

export const useEditForm = (
  initialValues: GitPOAPRequestEditValues,
  hasRemovedSavedImage: boolean,
) =>
  useForm<GitPOAPRequestEditValues>({
    validate: zodResolver(GitPOAPRequestEditSchema(hasRemovedSavedImage)),
    // Setting image to {} instead of null allows us to detect if it's been cleared
    initialValues: { ...initialValues },
  });

export type EditFormReturnTypes = ReturnType<typeof useEditForm>;
